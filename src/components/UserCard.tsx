import React, { useState } from 'react';

// Definindo o tipo User
interface User {
  id: number;
  email: string;
  role: 'user' | 'admin'; // O role pode ser 'user' ou 'admin'
}

interface UserCardProps {
  user: User; // Tipando o usuário como 'User' em vez de 'any'
  onRoleChange: (userId: number, newRole: 'user' | 'admin') => void; // Tipando a função de mudança de role
  onDelete: (userId: number) => void; // Tipando a função de exclusão de usuário
}

const UserCard: React.FC<UserCardProps> = ({ user, onRoleChange, onDelete }) => {
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin'>(user.role); // Tipando o estado selectedRole

  // Lidar com a alteração do role do usuário
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value as 'user' | 'admin'; // Garantindo que o valor seja um dos dois tipos
    setSelectedRole(newRole);
    onRoleChange(user.id, newRole);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p>{user.email}</p>
      <p className="mb-2">Role atual: {user.role}</p>
      <select
        value={selectedRole}
        onChange={handleRoleChange}
        className="p-2 border rounded"
      >
        <option value="user">Usuário</option>
        <option value="admin">Administrador</option>
      </select>
      <button
        onClick={() => onDelete(user.id)}
        className="bg-red-600 text-white p-2 rounded mt-2"
      >
        Deletar
      </button>
    </div>
  );
};

export default UserCard;
