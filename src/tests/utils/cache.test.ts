import { describe, expect, it } from 'bun:test';
import { Cache } from '../../utils/cache';

describe('Sistema de Cache', () => {
  // Configuração básica para testes
  const cache = new Cache({ 
    ttl: 1, // 1 segundo para facilitar testes
    prefix: 'test:'
  });

  it('deve armazenar e recuperar dados', () => {
    const data = { name: 'teste' };
    cache.set('chave', data);
    
    const resultado = cache.get('chave');
    expect(resultado).toEqual(data);
  });

  it('deve expirar dados após TTL', async () => {
    const data = { name: 'teste' };
    cache.set('expira', data);
    
    // Espera o TTL passar
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    const resultado = cache.get('expira');
    expect(resultado).toBeNull();
  });

  it('deve usar prefixo corretamente', () => {
    const data = { name: 'teste' };
    cache.set('prefixo', data);
    
    // O dado deve estar disponível com o prefixo
    const resultado = cache.get('prefixo');
    expect(resultado).toEqual(data);
  });

  it('deve limpar cache específico', () => {
    const data = { name: 'teste' };
    cache.set('limpar', data);
    
    cache.delete('limpar');
    const resultado = cache.get('limpar');
    expect(resultado).toBeNull();
  });

  it('deve limpar todo o cache', () => {
    cache.set('um', { id: 1 });
    cache.set('dois', { id: 2 });
    
    cache.clear();
    
    expect(cache.get('um')).toBeNull();
    expect(cache.get('dois')).toBeNull();
  });
}); 