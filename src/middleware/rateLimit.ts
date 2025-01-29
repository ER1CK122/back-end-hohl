import { Elysia } from 'elysia'
import { logger } from '../utils/logger'
import { metrics } from '../utils/metrics'

interface RateLimitConfig {
  max: number;      // Número máximo de requisições
  windowMs: number; // Janela de tempo em milissegundos
}

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

// Armazena as requisições por IP
const requestMap = new Map<string, RateLimitInfo>();

function getClientIp(request: Request): string {
  return request.headers.get('cf-connecting-ip') || 
         request.headers.get('x-real-ip') ||
         request.headers.get('x-forwarded-for')?.split(',')[0] || 
         'unknown';
}

// Limpa entradas expiradas a cada minuto
setInterval(() => {
  const now = Date.now();
  for (const [ip, info] of requestMap.entries()) {
    if (now > info.resetTime) {
      requestMap.delete(ip);
    }
  }
}, 60_000);

export function createRateLimit(config: RateLimitConfig) {
  return new Elysia()
    .onRequest(({ request, set }) => {
      const ip = getClientIp(request);
      const now = Date.now();

      let rateLimitInfo = requestMap.get(ip);
      
      // Reseta contador se o tempo expirou
      if (!rateLimitInfo || now > rateLimitInfo.resetTime) {
        rateLimitInfo = {
          count: 1,
          resetTime: now + config.windowMs
        };
      } else {
        rateLimitInfo.count++;
      }
      
      requestMap.set(ip, rateLimitInfo);

      // Headers de rate limit
      set.headers['X-RateLimit-Limit'] = config.max.toString();
      set.headers['X-RateLimit-Remaining'] = Math.max(0, config.max - rateLimitInfo.count).toString();
      set.headers['X-RateLimit-Reset'] = rateLimitInfo.resetTime.toString();

      // Verifica se excedeu o limite
      if (rateLimitInfo.count > config.max) {
        logger.warn({ ip, count: rateLimitInfo.count }, 'Rate limit excedido');
        metrics.rateLimitExceeded(ip);  // Registra métrica
        
        set.status = 429;
        return {
          error: 'Too many requests',
          message: 'Por favor, aguarde antes de fazer mais requisições',
          retryAfter: Math.ceil((rateLimitInfo.resetTime - now) / 1000)
        };
      }

      // Registra métricas de uso
      metrics.trackResponseTime('rate-limit', performance.now() - now);
      logger.debug({ ip, count: rateLimitInfo.count }, 'Requisição permitida');
    });
} 