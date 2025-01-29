import { config } from 'dotenv';
import { supabase } from '../http/server';

// Carrega variáveis de ambiente
config();

// Configura ambiente de teste
process.env.NODE_ENV = 'test';

// Função para limpar o banco antes dos testes
export async function cleanupDatabase() {
  await supabase.from('forms').delete().neq('id', 0);
  await supabase.from('api_keys').delete().neq('id', 0);
  
  // Insere API key de teste
  await supabase
    .from('api_keys')
    .insert({ api_key: '7b86595c-6c4a-48b6-a407-edf2a15bdf63' });
} 