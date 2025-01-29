import { swagger } from '@elysiajs/swagger';
import { formSchema } from '../validators/formValidator';

export const swaggerConfig = swagger({
  documentation: {
    info: {
      title: 'API de Formulários - Contabilidade Hohl',
      version: '1.0.0',
      description: 'API para gerenciamento de formulários de contato',
      contact: {
        name: 'Erick Nunes',
        url: 'https://github.com/ER1CK122'
      }
    },
    tags: [
      { name: 'forms', description: 'Operações com formulários' },
      { name: 'health', description: 'Verificação de saúde da API' },
      { name: 'metrics', description: 'Métricas da aplicação' }
    ],
    components: {
      schemas: {
        Form: formSchema
      }
    }
  }
}); 