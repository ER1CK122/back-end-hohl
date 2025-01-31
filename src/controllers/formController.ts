import { type Context, type Static } from 'elysia';
import { supabase } from '../http/server';
import { type ApiError } from '../types';
import { validateForm, formSchema } from '../validators';
import { formCache, logger, metrics, sendEmail } from '../utils';

export const handleFormSubmission = async ({ body, set }: Context <{ body: Static<typeof formSchema> }>) => {
  const startTime = performance.now();
  
  try {
    logger.info({ body }, 'Novo formulário recebido');

    // Gera uma chave única para o cache baseada nos dados do form
    const cacheKey = `${body.email}:${Date.now()}`;

    // Validar os dados recebidos
    const validation = validateForm(body);
    if (!validation.isValid) {
      logger.warn({ body, errors: validation.errors }, 'Validação falhou');
      metrics.formSubmitted('error');
      set.status = 400;
      return { 
        error: "Dados inválidos", 
        details: validation.errors
      };
    }

    // Inserir os dados no supabase
    const { error: dbError } = await supabase.from('forms').insert(body);

    if (dbError) {
      logger.error({ error: dbError }, 'Erro ao inserir no banco');
      metrics.formSubmitted('error');
      set.status = 500;
      throw new Error('Erro ao salvar os dados');
    }

    // Guarda no cache para consultas futuras
    formCache.set(cacheKey, {
      formData: body,
      submittedAt: new Date().toISOString()
    });

    logger.info({ email: body.email }, 'Formulário salvo com sucesso');

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
    
    metrics.formSubmitted('success');
    
    return { 
      success: "Formulário enviado com sucesso!",
      cacheKey // Retorna a chave do cache para referência
    };
  } catch (error) {
    const apiError = error as ApiError;
    logger.error({ 
      error: apiError,
      stack: apiError.stack
    }, 'Erro não tratado no processamento do formulário');
    
    set.status = apiError.status || 500;
    return { 
      error: "Erro ao processar o formulário",
      message: process.env.NODE_ENV === 'development' ? apiError.message : undefined
    };
  } finally {
    // Registra tempo de resposta
    const timeInSeconds = (performance.now() - startTime) / 1000;
    metrics.trackResponseTime('/api/forms', timeInSeconds);
  }
}

// Nova rota para consultar formulário pelo cache
export const getFormFromCache = async ({ params, set }: Context) => {
  const cachedForm = formCache.get(params.cacheKey);
  
  if (!cachedForm) {
    set.status = 404;
    return { error: "Formulário não encontrado no cache" };
  }

  return cachedForm;
};
