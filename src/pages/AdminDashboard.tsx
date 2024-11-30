import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Importando a Sidebar
import UserList from '../components/UserList';
import BookList from '../components/BookList';
import { useNavigate } from 'react-router-dom';

// Tipagem para o usuário no painel administrativo
interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

// Tipagem para a opção selecionada no painel
type SelectedOption = 'users' | 'books' | 'home';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<SelectedOption>('users'); // Opção selecionada
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null); // Usuário logado no painel

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user ? JSON.parse(user) : null);
  }, []);

  const handleSelectOption = (option: SelectedOption): void => {
    setSelectedOption(option); // Define a opção selecionada
  };

  const handleLogout = (): void => {
    localStorage.removeItem('currentUser'); // Remove o usuário do localStorage
    navigate('/'); // Redireciona para a página inicial
    setCurrentUser(null); // Reseta o estado do usuário
  };

  // Se não houver um usuário logado, retorna uma mensagem
  if (!currentUser) {
    return <div>Você precisa estar logado como administrador para acessar este painel.</div>;
  }

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar
        selectedOption={selectedOption}
        onSelectOption={handleSelectOption}
        onLogout={handleLogout}
      />

      {/* CONTEÚDO DA PÁGINA */}
      <div className="flex-1 p-6 pt-16">
        {selectedOption === 'users' && <UserList />}
        {selectedOption === 'books' && <BookList />}
      </div>
    </div>
  );
};

export default AdminDashboard;
