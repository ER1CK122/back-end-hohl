import { Counter, Histogram, Registry } from 'prom-client';
import { logger } from './logger';

// Cria um novo registro
const register = new Registry();

// Métricas para formulários
const formSubmissions = new Counter({
  name: 'form_submissions_total',
  help: 'Total de formulários submetidos',
  labelNames: ['status'] // success, error
});

// Métricas de tempo de resposta
const responseTime = new Histogram({
  name: 'response_time_seconds',
  help: 'Tempo de resposta em segundos',
  labelNames: ['route'],
  buckets: [0.1, 0.5, 1, 2, 5] // buckets em segundos
});

// Métricas de rate limit
const rateLimitHits = new Counter({
  name: 'rate_limit_hits_total',
  help: 'Número de vezes que o rate limit foi atingido',
  labelNames: ['ip']
});

// Registra todas as métricas
register.registerMetric(formSubmissions);
register.registerMetric(responseTime);
register.registerMetric(rateLimitHits);

// Exporta as métricas e funções helpers
export const metrics = {
  formSubmitted: (status: 'success' | 'error') => {
    formSubmissions.labels(status).inc();
    logger.debug({ status }, 'Métrica: formulário submetido');
  },

  trackResponseTime: (route: string, timeInSeconds: number) => {
    responseTime.labels(route).observe(timeInSeconds);
    logger.debug({ route, timeInSeconds }, 'Métrica: tempo de resposta');
  },

  rateLimitExceeded: (ip: string) => {
    rateLimitHits.labels(ip).inc();
    logger.debug({ ip }, 'Métrica: rate limit excedido');
  },

  // Endpoint para expor métricas no formato Prometheus
  getMetrics: async () => {
    return await register.metrics();
  }
}; 