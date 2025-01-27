import { type Context } from 'elysia';
import { supabase } from '../http/server';
import { sendEmail } from '../utils/emailService';
import type { FormData } from '../types/formData';

export const handleFormSubmission = async ({ body }: Context<{ body: FormData }>) => {
  try {
    const data = body;

    //TODO: ajustar autenticação para que somente possa gravar no supabase caso venha uma requisição com um token válido

    // Inserir os dados no supabase
    const { error } = await supabase.from('forms').insert(data);

    if (error) throw error;


    //TODO: Ajustar o email do cliente para deixar mais bonito
    // Envia emails
    await sendEmail(data.email, 'Confirmação de envio', 'Obrigado por entrar em contato conosco!');
    await sendEmail('ercknunes53@gmail.com', 'Novo Formulário de Cliente', `Nome: ${data.name}\nEmail: ${data.email}\nTelefone: ${data.phone}\nMensagem: ${data.mensage}`);
    
    return { success: "Formulário enviado com sucesso!" };
  } catch (error) {
    return { error: "Erro ao processar o formulário." };
  }
}
