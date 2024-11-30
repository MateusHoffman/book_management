import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchUsers, updateUserRole, deleteUser } from '../api/users';
import { User } from '../types'; // Importando o tipo User
import UserItem from '../components/UserItem';

// Tipando a resposta da consulta `useQuery`
const UserList = () => {
  // Tipando o dado retornado pela query como um array de Users ou undefined
  const { data: users, isLoading, isError } = useQuery<User[]>('users', fetchUsers);
  
  const queryClient = useQueryClient();

  // Tipando as mutações
  const mutationUpdateRole = useMutation<void, Error, { userId: number, newRole: string }>(updateUserRole, {
    onSuccess: () => {
      // Refresca a lista de usuários após a atualização da role
      queryClient.invalidateQueries('users');
    }
  });

  const mutationDeleteUser = useMutation<void, Error, number>(deleteUser, {
    onSuccess: () => {
      // Refresca a lista de usuários após a exclusão
      queryClient.invalidateQueries('users');
    }
  });

  // Função para atualizar o papel do usuário
  const handleRoleChange = (userId: number, newRole: string) => {
    mutationUpdateRole.mutate({ userId, newRole });
  };

  // Função para excluir um usuário
  const handleDeleteUser = (userId: number) => {
    mutationDeleteUser.mutate(userId);
  };

  if (isLoading) return <div>Carregando usuários...</div>;
  if (isError) return <div>Erro ao carregar usuários.</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gerenciar Usuários</h2>
      <div className="space-y-4">
        {users?.map((user: User) => (
          <UserItem
            key={user.id}
            user={user}
            onRoleChange={handleRoleChange}
            onDelete={handleDeleteUser}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
