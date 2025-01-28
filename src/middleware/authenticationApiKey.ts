import { Elysia } from 'elysia';
import { supabase } from '../http/server';

export const authenticationApiKey = new Elysia()
  .onRequest(async ({ request, set }) => {
    // Ignora a verificação para rotas não protegidas
    if (request.url.endsWith('/')) return;

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
