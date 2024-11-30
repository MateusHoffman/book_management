// import { useQuery, useMutation } from 'react-query';
// import { fetchUsers, updateUserRole, deleteUser } from '../api/users';
// import UserCard from '../components/UserCard';

// const UserManagement = () => {
//   const { data: users, isLoading, isError } = useQuery('users', fetchUsers);

//   const mutationUpdateRole = useMutation(updateUserRole);
//   const mutationDeleteUser = useMutation(deleteUser);

//   const handleRoleChange = (userId: number, newRole: string) => {
//     mutationUpdateRole.mutate({ userId, newRole });
//   };

//   const handleDeleteUser = (userId: number) => {
//     mutationDeleteUser.mutate(userId);
//   };

//   if (isLoading) return <div>Carregando usuários...</div>;
//   if (isError) return <div>Erro ao carregar usuários.</div>;

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Gerenciar Usuários</h2>
//       <div className="space-y-4">
//         {users?.map((user: any) => (
//           <UserCard
//             key={user.id}
//             user={user}
//             onRoleChange={handleRoleChange}
//             onDelete={handleDeleteUser}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserManagement;
