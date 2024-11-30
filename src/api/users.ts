const API_URL = process.env.REACT_APP_API_URL; // Pegando a URL da API do .env

// Função para criar um novo usuário na API
export const createUser = async ({ email, password }: { email: string, password: string }) => {
  // Busca a lista de usuários para verificar se já existe algum usuário
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Erro ao buscar usuários');
  }
  const users = await response.json();

  // Definir a role do novo usuário
  const role = users.length === 0 ? 'admin' : 'user'; // Se não houver nenhum usuário, atribui role "admin"

  // Criação do novo usuário
  const newUser = {
    email,
    password, // Em produção, use hash de senha, não guarde senhas em texto claro
    role,
  };

  // Enviando o novo usuário para a API
  const createResponse = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  if (!createResponse.ok) {
    throw new Error('Erro ao criar o usuário');
  }

  return createResponse.json(); // Retorna o usuário criado
};

// Função para buscar usuários da API
export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Erro ao buscar usuários');
  }
  return response.json();
};

// Função para atualizar a role de um usuário na API
export const updateUserRole = async ({ userId, newRole }: { userId: number; newRole: string }) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH', // Usar PATCH ao invés de PUT para atualizar parcialmente
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role: newRole }), // Enviando apenas a role para ser alterada
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar a role do usuário');
  }

  return response.json(); // Retorna os dados do usuário atualizado
};

// Função para deletar um usuário na API
export const deleteUser = async (userId: number) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir usuário');
  }

  return response.json(); // Retorna a confirmação de exclusão
};
