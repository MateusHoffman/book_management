import { authenticateUser, isValidEmail, isValidPassword } from '../utils/auth';
import { fetchUsers } from '../api/users';
import { User } from '../types';

// Mock da função `fetchUsers` para evitar chamadas à API real
jest.mock('../api/users', () => ({
  fetchUsers: jest.fn(),
}));

describe('authUtils', () => {

  // Teste para a função `authenticateUser`
  describe('authenticateUser', () => {
    it('deve autenticar o usuário com sucesso', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: '12345',
        role: 'user',
      };

      // Simula a resposta do fetchUsers
      (fetchUsers as jest.Mock).mockResolvedValue([mockUser]);

      const user = await authenticateUser('test@example.com', '12345');

      expect(user).toEqual(mockUser); // Verifica se o usuário retornado é o esperado
      expect(fetchUsers).toHaveBeenCalledTimes(1); // Verifica se a função fetchUsers foi chamada uma vez
    });

    it('deve retornar null quando as credenciais forem inválidas', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: '12345',
        role: 'user',
      };

      (fetchUsers as jest.Mock).mockResolvedValue([mockUser]);

      const user = await authenticateUser('wrong@example.com', 'wrongpassword');

      expect(user).toBeNull(); // Espera que o retorno seja null quando as credenciais forem erradas
    });

    it('deve retornar null quando não houver usuários', async () => {
      (fetchUsers as jest.Mock).mockResolvedValue([]);

      const user = await authenticateUser('test@example.com', '12345');

      expect(user).toBeNull(); // Espera que o retorno seja null quando não houver usuários
    });
  });

  // Teste para a função `isValidEmail`
  describe('isValidEmail', () => {
    it('deve validar um e-mail válido', () => {
      const validEmail = 'test@example.com';
      const result = isValidEmail(validEmail);

      expect(result).toBe(true); // Espera true para um e-mail válido
    });

    it('deve invalidar um e-mail inválido', () => {
      const invalidEmail = 'test@com';
      const result = isValidEmail(invalidEmail);

      expect(result).toBe(false); // Espera false para um e-mail inválido
    });

    it('deve invalidar um e-mail sem @', () => {
      const invalidEmail = 'testexample.com';
      const result = isValidEmail(invalidEmail);

      expect(result).toBe(false); // Espera false para e-mail sem @
    });
  });

  // Teste para a função `isValidPassword`
  describe('isValidPassword', () => {
    it('deve validar uma senha com comprimento maior que 0', () => {
      const validPassword = '12345';
      const result = isValidPassword(validPassword);

      expect(result).toBe(true); // Espera true para senha válida
    });

    it('deve invalidar uma senha vazia', () => {
      const invalidPassword = '';
      const result = isValidPassword(invalidPassword);

      expect(result).toBe(false); // Espera false para senha vazia
    });

    it('deve invalidar uma senha com apenas espaços', () => {
      const invalidPassword = '     ';
      const result = isValidPassword(invalidPassword);

      expect(result).toBe(false); // Espera false para senha com espaços
    });
  });
});
