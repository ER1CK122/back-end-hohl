import { type Context } from 'elysia';
import { supabase } from '../http/server';
import { type ApiError } from '../types/errors';
import { sendEmail } from '../utils/emailService';
import { validateForm } from '../validators/validateForm';
import { type Static } from '@sinclair/typebox';
import { formSchema } from '../validators/formValidator';

type FormData = Static<typeof formSchema>;

export const handleFormSubmission = async ({ body, set }: Context<{ body: FormData }>) => {
  try {
    // Validar os dados recebidos
    const validation = validateForm(body);
    if (!validation.isValid) {
      set.status = 400;
      console.error('Erro de validação:', { body, errors: validation.errors });
      return { 
        error: "Dados inválidos", 
        details: validation.errors
      };
    }

    // Inserir os dados no supabase
    const { error: dbError } = await supabase.from('forms').insert(body);

    if (dbError) {
      console.error('Erro ao inserir no banco:', dbError);
      set.status = 500;
      throw new Error('Erro ao salvar os dados');
    }

    try {
      // Envia emails
      await Promise.all([
        sendEmail(
          body.email, 
          'Confirmação de envio', 
          'Obrigado por entrar em contato conosco!'
        ),
        sendEmail(
          'ercknunes53@gmail.com', 
          'Novo Formulário de Cliente', 
          `Nome: ${body.name}\nEmail: ${body.email}\nTelefone: ${body.phone}\nMensagem: ${body.mensage}`
        )
      ]);
    } catch (emailError) {
      console.error('Erro ao enviar emails:', emailError);
      // Não retornamos erro ao usuário pois os dados já foram salvos
    }
    
    return { success: "Formulário enviado com sucesso!" };
  } catch (error) {
    const apiError = error as ApiError;
    console.error('Erro não tratado:', apiError);
    set.status = apiError.status || 500;
    
    return { 
      error: "Erro ao processar o formulário.",
      message: process.env.NODE_ENV === 'development' ? apiError.message : undefined
    };
  }
}
