import { describe, expect, it } from 'bun:test';
import { validateForm } from '../../validators/validateForm';

describe('Validação de Formulário', () => {
  it('deve aceitar dados válidos', () => {
    const dadosValidos = {
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      mensage: "Uma mensagem de teste válida"
    };

    const resultado = validateForm(dadosValidos);
    expect(resultado.isValid).toBe(true);
  });

  describe('Validação do Nome', () => {
    it('deve rejeitar nome muito curto', () => {
      const dadosInvalidos = {
        name: "Jo",
        email: "joao@email.com",
        phone: "(11) 99999-9999",
        mensage: "Uma mensagem de teste válida"
      };

      const resultado = validateForm(dadosInvalidos);
      expect(resultado.isValid).toBe(false);
      expect(resultado.errors?.[0].field).toBe('name');
    });

    it('deve rejeitar nome muito longo', () => {
      const dadosInvalidos = {
        name: "a".repeat(101),
        email: "joao@email.com",
        phone: "(11) 99999-9999",
        mensage: "Uma mensagem de teste válida"
      };

      const resultado = validateForm(dadosInvalidos);
      expect(resultado.isValid).toBe(false);
      expect(resultado.errors?.[0].field).toBe('name');
    });
  });

  describe('Validação do Email', () => {
    it('deve rejeitar email sem @', () => {
      const dadosInvalidos = {
        name: "João Silva",
        email: "joaoemail.com",
        phone: "(11) 99999-9999",
        mensage: "Uma mensagem de teste válida"
      };

      const resultado = validateForm(dadosInvalidos);
      expect(resultado.isValid).toBe(false);
      expect(resultado.errors?.[0].field).toBe('email');
    });

    it('deve rejeitar email sem domínio', () => {
      const dadosInvalidos = {
        name: "João Silva",
        email: "joao@",
        phone: "(11) 99999-9999",
        mensage: "Uma mensagem de teste válida"
      };

      const resultado = validateForm(dadosInvalidos);
      expect(resultado.isValid).toBe(false);
      expect(resultado.errors?.[0].field).toBe('email');
    });
  });

  describe('Validação do Telefone', () => {
    it('deve rejeitar telefone sem parênteses', () => {
      const dadosInvalidos = {
        name: "João Silva",
        email: "joao@email.com",
        phone: "11 99999-9999",
        mensage: "Uma mensagem de teste válida"
      };

      const resultado = validateForm(dadosInvalidos);
      expect(resultado.isValid).toBe(false);
      expect(resultado.errors?.[0].field).toBe('phone');
    });

    it('deve rejeitar telefone sem hífen', () => {
      const dadosInvalidos = {
        name: "João Silva",
        email: "joao@email.com",
        phone: "(11) 999999999",
        mensage: "Uma mensagem de teste válida"
      };

      const resultado = validateForm(dadosInvalidos);
      expect(resultado.isValid).toBe(false);
      expect(resultado.errors?.[0].field).toBe('phone');
    });
  });

  describe('Validação da Mensagem', () => {
    it('deve rejeitar mensagem muito curta', () => {
      const dadosInvalidos = {
        name: "João Silva",
        email: "joao@email.com",
        phone: "(11) 99999-9999",
        mensage: "Curta"
      };

      const resultado = validateForm(dadosInvalidos);
      expect(resultado.isValid).toBe(false);
      expect(resultado.errors?.[0].field).toBe('mensage');
    });

    it('deve rejeitar mensagem muito longa', () => {
      const dadosInvalidos = {
        name: "João Silva",
        email: "joao@email.com",
        phone: "(11) 99999-9999",
        mensage: "a".repeat(1001)
      };

      const resultado = validateForm(dadosInvalidos);
      expect(resultado.isValid).toBe(false);
      expect(resultado.errors?.[0].field).toBe('mensage');
    });
  });

  describe('Campos Obrigatórios', () => {
    it('deve rejeitar formulário sem nome', () => {
      const dadosInvalidos = {
        email: "joao@email.com",
        phone: "(11) 99999-9999",
        mensage: "Uma mensagem de teste válida"
      };

      const resultado = validateForm(dadosInvalidos);
      expect(resultado.isValid).toBe(false);
      expect(resultado.errors?.[0].field).toBe('name');
    });

    it('deve rejeitar formulário sem email', () => {
      const dadosInvalidos = {
        name: "João Silva",
        phone: "(11) 99999-9999",
        mensage: "Uma mensagem de teste válida"
      };

      const resultado = validateForm(dadosInvalidos);
      expect(resultado.isValid).toBe(false);
      expect(resultado.errors?.[0].field).toBe('email');
    });
  });
}); 