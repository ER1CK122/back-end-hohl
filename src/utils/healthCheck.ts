import { supabase } from '../http/server';

export async function checkServices() {
  try {
    // Verifica conexão com Supabase
    const { data, error } = await supabase.from('api_keys').select('count').limit(1);
    if (error) throw error;

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        database: 'healthy',
        version: process.env.npm_package_version || '1.0.0'
      },
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'production',
      memory: {
        used: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
        total: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100
      }
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        database: 'unhealthy',
        version: process.env.npm_package_version || '1.0.0'
      },
      error: 'Database connection failed'
    };
  }
} 