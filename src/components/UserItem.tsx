import React, { useState } from 'react';

// Definindo o tipo User
interface User {
  id: number;
  email: string;
  role: 'user' | 'admin'; // O role pode ser 'user' ou 'admin'
}

interface UserItemProps {
  user: User; // Agora usamos o tipo User
  onRoleChange: (userId: number, newRole: 'user' | 'admin') => void; // Tipando a função de mudança de role
  onDelete: (userId: number) => void; // Tipando a função de exclusão de usuário
}

const UserItem: React.FC<UserItemProps> = ({ user, onRoleChange, onDelete }) => {
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin'>(user.role); // Tipando o estado selectedRole

  // Obtendo o usuário logado do localStorage com segurança
  const currentUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('currentUser') || 'null') : null;

  // Verificando se o usuário logado é o mesmo que o usuário da lista
  const isOwnProfile = currentUser && currentUser.id === user.id;

  // Lidar com a alteração do role do usuário
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value as 'user' | 'admin'; // Garantindo que o valor seja um dos dois tipos
    setSelectedRole(newRole);
    onRoleChange(user.id, newRole);
  };

  // Lidar com a exclusão do usuário
  const handleDelete = () => {
    if (!isOwnProfile) {
      onDelete(user.id);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-row justify-between items-center">
      <p>{user.email}</p>
      <div className="gap-3 flex">
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="border rounded p-2"
          disabled={isOwnProfile} // Desabilita o select se for o próprio usuário
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white rounded p-2"
          style={{
            opacity: isOwnProfile ? 0.3 : 1, // Baixa opacidade se for o próprio usuário
            pointerEvents: isOwnProfile ? 'none' : 'auto', // Desabilita o clique se for o próprio usuário
          }}
          disabled={isOwnProfile} // Desabilita o botão de deletar se for o próprio usuário
        >
          Deletar
        </button>
      </div>
    </div>
  );
};

export default UserItem;
