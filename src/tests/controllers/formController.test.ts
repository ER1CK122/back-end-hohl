import { describe, expect, it, mock } from 'bun:test';
import { handleFormSubmission } from '../../controllers/formController';

// Mock do sendEmail
mock.module('../../utils/emailService', () => ({
  sendEmail: mock(() => Promise.resolve())
}));

// Helper para criar contexto
const createMockContext = (body: any) => ({
  body,
  set: { status: 200 },
  query: {},
  params: {},
  headers: {},
  cookie: {},
  store: {},
  path: '',
  request: new Request('http://localhost'),
} as any);

describe('Form Controller', () => {
  const validBody = {
    name: "Junior Nunes",
    email: "ercknunes53@email.com",
    phone: "(11) 99999-9999",
    mensage: "Uma mensagem de teste válida"
  };

  const mockContext = createMockContext(validBody);

  it('deve processar formulário válido com sucesso', async () => {
    // Mock do Supabase
    mock.module('@supabase/supabase-js', () => ({
      createClient: () => ({
        from: () => ({
          insert: () => Promise.resolve({ error: null })
        })
      })
    }));

    const response = await handleFormSubmission(mockContext);

    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('cacheKey');
    expect(mockContext.set.status).toBe(200);
  });

  it('deve rejeitar dados inválidos', async () => {
    const invalidContext = createMockContext({
      name: "Jo",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      mensage: "Uma mensagem de teste válida"
    });

    const response = await handleFormSubmission(invalidContext);

    expect(response).toHaveProperty('error');
    expect(response).toHaveProperty('details');
    expect(invalidContext.set.status).toBe(400);
  });

  it('deve lidar com erro do banco de dados', async () => {
    // Mock do Supabase com erro
    mock.module('@supabase/supabase-js', () => ({
      createClient: () => ({
        from: () => ({
          insert: () => Promise.resolve({ 
            error: new Error('Erro de banco de dados') 
          })
        })
      })
    }));

    const response = await handleFormSubmission(mockContext);

    expect(response).toHaveProperty('error');
    expect(mockContext.set.status).toBe(500);
  });
}); 