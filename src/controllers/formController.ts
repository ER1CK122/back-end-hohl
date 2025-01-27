import { type Context } from 'elysia';
import { supabase } from '../http/server';
import { sendEmail } from '../utils/emailService';
import type { FormData } from '../types/formData';

export const handleFormSubmission = async ({ body }: Context<{ body: FormData }>) => {
  try {
    const data = body;

    // Inserir os dados no supabase
    const { error } = await supabase.from('forms').insert(data);

    if (error) throw error;

    // Envia emails
    await sendEmail(data.email, 'Confirmação de envio', 'Obrigado por entrar em contato conosco!');
    await sendEmail('ercknunes53@gmail.com', 'Novo Formulário de Cliente', `Nome: ${data.name}\nEmail: ${data.email}\nTelefone: ${data.phone}\nMensagem: ${data.mensage}`);
    
    return { success: "Formulário enviado com sucesso!" };
  } catch (error) {
    return { error: "Erro ao processar o formulário." };
  }
}
