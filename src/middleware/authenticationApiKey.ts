import { Elysia } from 'elysia';
import { supabase } from '../http/server';

// Lista de rotas públicas que não precisam de autenticação
const PUBLIC_ROUTES = ['/health'];

export const authenticationApiKey = new Elysia()
  .onRequest(async ({ request, set }) => {
    // Verifica se a rota atual está na lista de rotas públicas
    const isPublicRoute = PUBLIC_ROUTES.some(route => 
      request.url.endsWith(route)
    );

    if (isPublicRoute) return;

    try {   
      const apiKey = request.headers.get('x-api-key');
      
      if (!apiKey) {
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
        set.status = 401;
        return { error: 'Chave da API não encontrada' };
      }
    } catch (error) {
      set.status = 401;
      return { error: "Erro ao autenticar a chave da API." };
    }
  });
