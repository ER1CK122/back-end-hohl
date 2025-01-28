import { Elysia } from 'elysia'

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

// Limpa entradas expiradas a cada minuto
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [ip, info] of requestMap.entries()) {
    if (now > info.resetTime) {
      requestMap.delete(ip);
    }
  }
}

setInterval(cleanupExpiredEntries, 60_000); // Executa a cada minuto

function getClientIp(request: Request): string {
  return request.headers.get('cf-connecting-ip') || // Cloudflare
         request.headers.get('x-real-ip') ||        // Nginx
         request.headers.get('x-forwarded-for')?.split(',')[0] || // Proxy
         'unknown';
}

export function createRateLimit(config: RateLimitConfig) {
  return new Elysia()
    .derive(({ request, set }) => {
      const ip = getClientIp(request);
      const now = Date.now();

      // Pega ou cria informações de rate limit para este IP
      let rateLimitInfo = requestMap.get(ip);
      
      if (!rateLimitInfo || now > rateLimitInfo.resetTime) {
        // Primeira requisição ou tempo resetado
        rateLimitInfo = {
          count: 1,
          resetTime: now + config.windowMs
        };
      } else {
        // Incrementa contador
        rateLimitInfo.count++;
      }

      // Atualiza o Map
      requestMap.set(ip, rateLimitInfo);

      // Verifica se excedeu o limite
      if (rateLimitInfo.count > config.max) {
        console.warn(`Rate limit excedido para IP ${ip}`);
        set.status = 429;
        return {
          error: 'Too many requests',
          message: 'Por favor, aguarde antes de fazer mais requisições',
          resetTime: rateLimitInfo.resetTime,
          retryAfter: Math.ceil((rateLimitInfo.resetTime - now) / 1000)
        };
      }

      // Adiciona headers de rate limit
      set.headers['X-RateLimit-Limit'] = config.max.toString();
      set.headers['X-RateLimit-Remaining'] = (config.max - rateLimitInfo.count).toString();
      set.headers['X-RateLimit-Reset'] = rateLimitInfo.resetTime.toString();

      // Adiciona header Retry-After quando próximo do limite
      if (rateLimitInfo.count > config.max * 0.8) {
        set.headers['Retry-After'] = Math.ceil((rateLimitInfo.resetTime - now) / 1000).toString();
      }
    });
} 