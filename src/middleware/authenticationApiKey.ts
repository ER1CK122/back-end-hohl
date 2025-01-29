import { Elysia } from 'elysia';
import { supabase } from '../http/server';
import { logger } from '../utils/logger';

// Lista de rotas públicas que não precisam de autenticação
const PUBLIC_PATHS = [
  '/public/',  // Todas as rotas sob /public
  '/swagger',  // Documentação Swagger
  '/swagger/json' // Especificação OpenAPI
];

export const authenticationApiKey = new Elysia()
  .onRequest(async ({ request, set }) => {
    const url = new URL(request.url);
    
    // Verifica se a rota atual é pública
    const isPublicPath = PUBLIC_PATHS.some(path => 
      url.pathname.startsWith(path)
    );

    if (isPublicPath) {
      logger.debug({ path: url.pathname }, 'Acessando rota pública');
      return;
    }

    try {   
      const apiKey = request.headers.get('x-api-key');
      
      if (!apiKey) {
        logger.warn({ path: url.pathname }, 'Tentativa de acesso sem API Key');
        set.status = 401;
        return { error: 'API Key não fornecida' };
      }

      const { data, error } = await supabase
        .from('api_keys')
        .select('api_key')
        .eq('api_key', apiKey)
        .limit(1);
      
      if (error) throw error;
      if (!data?.length) {
        logger.warn({ path: url.pathname, apiKey }, 'API Key inválida');
        set.status = 401;
        return { error: 'Chave da API não encontrada' };
      }

      logger.debug({ path: url.pathname }, 'API Key válida');
    } catch (error) {
      logger.error({ error }, 'Erro ao validar API Key');
      set.status = 401;
      return { error: "Erro ao autenticar a chave da API." };
    }
  });
