import React, { useState } from 'react';
import { FaUserAlt, FaBook, FaSignOutAlt, FaBars, FaTimes, FaHome } from 'react-icons/fa'; // Ícones
import { useNavigate } from 'react-router-dom'; // Para navegação

// Definindo os tipos das opções da sidebar
type SidebarOption = 'users' | 'books' | 'home';

interface SidebarProps {
  selectedOption: SidebarOption; // Tipando a opção selecionada
  onSelectOption: (option: SidebarOption) => void; // Tipando a função de seleção de opção
  onLogout: () => void; // Tipando a função de logout
}

const Sidebar: React.FC<SidebarProps> = ({ selectedOption, onSelectOption, onLogout }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Tipando o estado de abertura da sidebar
  const navigate = useNavigate(); // Hook de navegação

  // Função para alternar a visibilidade da sidebar no mobile
  const toggleSidebar = (): void => {
    setIsOpen(!isOpen);
  };

  // Função para redirecionar para a página inicial
  const handleHomeClick = (): void => {
    navigate('/'); // Redireciona para a página inicial
  };

  return (
    <>
      {/* Barra lateral (Sidebar) */}
      <div
        className={`fixed inset-0 z-10 bg-gray-800 bg-opacity-75 md:bg-opacity-0 transition-all ease-in-out duration-300 md:static md:w-64 ${isOpen ? 'block' : 'hidden'
          }`}
        onClick={toggleSidebar} // Fechar quando clicar fora
      ></div>
      <div
        className={`z-20 fixed top-0 left-0 w-64 bg-gray-800 text-white min-h-screen transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0 md:block md:w-64 transition-transform duration-300 ease-in-out`}
      >
        {/* Header da Sidebar */}
        <div className="flex justify-between items-center p-6 md:hidden">
          <span className="text-xl font-semibold">Admin Dashboard</span>
          <button onClick={toggleSidebar}>
            <FaTimes className="text-white" size={24} />
          </button>
        </div>
        <div className="space-y-4 mt-8 px-6">
          {/* Home */}
          <div
            className={`flex items-center p-2 cursor-pointer rounded-lg ${selectedOption === 'home' ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            onClick={handleHomeClick}
          >
            <FaHome className="mr-3" />
            <span>Home</span>
          </div>

          {/* Gerenciar Usuários */}
          <div
            className={`flex items-center p-2 cursor-pointer rounded-lg ${selectedOption === 'users' ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            onClick={() => onSelectOption('users')}
          >
            <FaUserAlt className="mr-3" />
            <span>Gerenciar Usuários</span>
          </div>

          {/* Gerenciar Livros */}
          <div
            className={`flex items-center p-2 cursor-pointer rounded-lg ${selectedOption === 'books' ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            onClick={() => onSelectOption('books')}
          >
            <FaBook className="mr-3" />
            <span>Gerenciar Livros</span>
          </div>

          {/* Logout */}
          <div
            className="flex items-center p-2 cursor-pointer rounded-lg hover:bg-gray-700"
            onClick={onLogout}
          >
            <FaSignOutAlt className="mr-3" />
            <span>Sair</span>
          </div>
        </div>
      </div>

      {/* Botão para abrir a sidebar em dispositivos móveis */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-full"
      >
        <FaBars size={24} />
      </button>
    </>
  );
};

export default Sidebar;
