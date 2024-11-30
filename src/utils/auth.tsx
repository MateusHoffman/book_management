import { User } from '../types'; // Supondo que você tenha o tipo User
import { fetchUsers } from '../api/users'; // Supondo que você tenha a função fetchUsers

// Função que autentica o usuário com base nas credenciais
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  const users = await fetchUsers(); // Buscando os usuários
  return users.find(
    (user: User) => user.email === email && user.password === password
  ) || null;
};

// Função para validar o formato do e-mail
export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

// Função para validar o comprimento da senha
export const isValidPassword = (password: string): boolean => {
  return password.trim().length > 0;
};
