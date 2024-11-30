// users.test.ts (Testes das funções de usuários)
import { createUser, fetchUsers, updateUserRole, deleteUser } from './users';
import fetchMock from 'jest-fetch-mock';

// Dados de exemplo
const mockNewUser = {
  email: 'newuser@example.com',
  password: '123456',
};

const mockUpdatedUser = {
  id: 1,
  email: 'existinguser@example.com',
  role: 'user',
};

const mockFetchedUsers = [
  { id: 1, email: 'existinguser@example.com', role: 'admin' },
];

// Habilitando o jest-fetch-mock
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks(); // Resetar mocks antes de cada teste
});

describe('Funções da API de Usuários', () => {

  test('createUser deve atribuir role "admin" se não houver usuários existentes', async () => {
    // Simulando resposta vazia de usuários
    fetchMock.mockResponseOnce(JSON.stringify([]));  // Não há usuários

    // Simulando a criação de um novo usuário
    fetchMock.mockResponseOnce(JSON.stringify({
      ...mockNewUser,
      role: 'admin',
    }));

    const user = await createUser(mockNewUser);

    // Verificando se o primeiro usuário recebe a role "admin"
    expect(user.role).toBe('admin');
  });

  test('createUser deve atribuir role "user" se já houver usuários existentes', async () => {
    // Simulando resposta com usuários existentes
    fetchMock.mockResponseOnce(JSON.stringify(mockFetchedUsers));  // Já há um usuário com role 'admin'

    // Simulando a criação de um novo usuário
    fetchMock.mockResponseOnce(JSON.stringify({
      ...mockNewUser,
      role: 'user',
    }));

    const user = await createUser(mockNewUser);

    // Verificando se o novo usuário recebe a role "user"
    expect(user.role).toBe('user');
  });

  test('createUser deve lançar erro se a resposta de criação do usuário falhar', async () => {
    // Simulando erro ao criar o usuário
    fetchMock.mockRejectOnce(new Error('Erro ao criar o usuário'));

    // Verificando se a função lança erro
    await expect(createUser(mockNewUser)).rejects.toThrow('Erro ao criar o usuário');
  });

  test('fetchUsers deve retornar a lista de usuários', async () => {
    // Simulando a resposta da API para retornar usuários
    fetchMock.mockResponseOnce(JSON.stringify(mockFetchedUsers));

    const users = await fetchUsers();

    // Verificando se a resposta contém os usuários esperados
    expect(users).toEqual(mockFetchedUsers);
  });

  test('fetchUsers deve lançar erro se a requisição falhar', async () => {
    // Simulando erro ao buscar usuários
    fetchMock.mockRejectOnce(new Error('Erro ao buscar usuários'));

    // Verificando se a função lança erro
    await expect(fetchUsers()).rejects.toThrow('Erro ao buscar usuários');
  });

  test('updateUserRole deve atualizar a role de um usuário com sucesso', async () => {
    const updatedUser = { ...mockUpdatedUser, role: 'user' };

    // Simulando resposta de atualização de role
    fetchMock.mockResponseOnce(JSON.stringify(updatedUser));

    const user = await updateUserRole({ userId: 1, newRole: 'user' });

    // Verificando se a role foi atualizada corretamente
    expect(user.role).toBe('user');
  });

  test('updateUserRole deve lançar erro se a atualização da role falhar', async () => {
    // Simulando erro na atualização da role
    fetchMock.mockRejectOnce(new Error('Erro ao atualizar a role do usuário'));

    // Verificando se a função lança erro
    await expect(updateUserRole({ userId: 1, newRole: 'user' })).rejects.toThrow('Erro ao atualizar a role do usuário');
  });

  test('deleteUser deve excluir um usuário com sucesso', async () => {
    // Simulando resposta de exclusão de usuário
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Usuário excluído com sucesso' }));

    const response = await deleteUser(1);

    // Verificando se a resposta confirma a exclusão
    expect(response.message).toBe('Usuário excluído com sucesso');
  });

  test('deleteUser deve lançar erro se a exclusão falhar', async () => {
    // Simulando erro na exclusão do usuário
    fetchMock.mockRejectOnce(new Error('Erro ao excluir usuário'));

    // Verificando se a função lança erro
    await expect(deleteUser(1)).rejects.toThrow('Erro ao excluir usuário');
  });

  // Teste adicional: createUser deve lançar erro se não for possível buscar a lista de usuários
  test('createUser deve lançar erro se não for possível buscar a lista de usuários', async () => {
    // Simulando erro ao buscar a lista de usuários
    fetchMock.mockRejectOnce(new Error('Erro ao buscar usuários'));

    // Verificando se a função lança erro
    await expect(createUser(mockNewUser)).rejects.toThrow('Erro ao buscar usuários');
  });

  // Teste adicional: updateUserRole deve fazer uma requisição PATCH com os parâmetros corretos
  test('updateUserRole deve fazer uma requisição PATCH com os parâmetros corretos', async () => {
    const updatedUser = { ...mockUpdatedUser, role: 'user' };

    // Simulando resposta de atualização de role
    fetchMock.mockResponseOnce(JSON.stringify(updatedUser));

    await updateUserRole({ userId: 1, newRole: 'user' });

    // Verificando se a requisição foi feita corretamente com o método PATCH
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/users/1`,
      expect.objectContaining({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'user' }),
      })
    );
  });

  // Teste adicional: deleteUser deve chamar fetch com os parâmetros corretos
  test('deleteUser deve chamar fetch com os parâmetros corretos', async () => {
    const userId = 1;

    // Simulando a resposta de exclusão de usuário
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Usuário excluído com sucesso' }));

    await deleteUser(userId);

    // Verificando se a requisição DELETE foi chamada corretamente
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/users/${userId}`,
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });

});
