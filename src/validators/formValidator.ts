import { Type as t } from '@sinclair/typebox'

// Schema para validação do formulário
export const formSchema = t.Object({
  name: t.String({
    minLength: 3,
    maxLength: 100,
    description: 'Nome do cliente',
    errorMessage: {
      minLength: 'Nome deve ter no mínimo 3 caracteres',
      maxLength: 'Nome deve ter no máximo 100 caracteres',
      type: 'Nome deve ser uma string válida',
      required: 'Nome é obrigatório'
    }
  }),
  email: t.String({
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    description: 'Email válido do cliente',
    errorMessage: {
      pattern: 'Email inválido',
      type: 'Email deve ser uma string válida',
      required: 'Email é obrigatório'
    }
  }),
  phone: t.String({
    pattern: '^\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}$',
    description: 'Telefone no formato (99) 99999-9999',
    errorMessage: {
      minLength: 'Telefone deve ter no mínimo 11 caracteres',
      maxLength: 'Telefone deve ter no máximo 11 caracteres',
      type: 'Telefone deve ser uma string válida',
      pattern: 'O telefone deve estar no formato (99) 99999-9999',
      required: 'Telefone é obrigatório'
    }
  }),
  mensage: t.String({
    minLength: 10,
    maxLength: 1000,
    description: 'Mensagem do cliente',
    errorMessage: {
      minLength: 'Mensagem deve ter no mínimo 10 caracteres',
      maxLength: 'Mensagem deve ter no máximo 1000 caracteres',
      type: 'Mensagem deve ser uma string válida',
      required: 'Mensagem é obrigatório'
    }
  })
})
