import { Link, useNavigate } from 'react-router-dom';  // Adicionando o Link aqui
import { useState } from 'react';

// Definindo a interface para as propriedades do Header
interface HeaderProps {
  isLoggedIn: boolean; // Estado que indica se o usuário está logado
  setIsLoggedIn: (isLoggedIn: boolean) => void; // Função para atualizar o estado de login
}

interface User {
  id: number;
  email: string;
  role: 'admin' | 'user'; // Tipagem do tipo de role do usuário
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Controle do menu hamburguer

  // Função de logout
  const handleLogout = (): void => {
    localStorage.removeItem('currentUser'); // Remove o usuário do localStorage
    setIsLoggedIn(!!localStorage.getItem('currentUser')); // Atualiza o estado
  };

  // Função para redirecionar para o dashboard de admin
  const handleAdminDashboardRedirect = (): void => {
    navigate('/admin-dashboard');
  };

  // Verificar se o usuário logado é um admin
  const currentUser = localStorage.getItem('currentUser');
  const user: User | null = currentUser ? JSON.parse(currentUser) : null; // Tipagem do usuário
  const isAdmin = user?.role === 'admin'; // Verifica se o usuário tem a role 'admin'

  return (
<header className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg py-6 z-50 fixed w-full top-0 left-0">
  <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
    {/* Logo */}
    <div className="text-white text-3xl font-extrabold cursor-pointer">
      Gerenciador de <span className="text-yellow-400">livros</span>
    </div>

    {/* Menu Hamburguer para dispositivos móveis */}
    <div className="lg:hidden flex items-center">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    {/* Menu Principal */}
    <div className={`flex z-100 items-center space-x-6 ${menuOpen ? 'flex-col absolute top-20 left-0 w-full bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4 rounded-lg md:hidden' : 'hidden md:flex'}`}>
      {isLoggedIn ? (
        <div className='flex md:flex-row flex-col gap-3'>
          {isAdmin && (
            <button
              onClick={handleAdminDashboardRedirect}
              className="w-full text-white py-2 px-6 rounded-lg text-lg font-semibold bg-black bg-opacity-20 hover:bg-black hover:bg-opacity-50 transition-colors"
            >
              Dashboard
            </button>
          )}
          
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button className="w-full bg-yellow-400 text-indigo-800 py-2 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition-colors">
            Login
          </button>
        </Link>
      )}
    </div>
  </div>
</header>

  );
};

export default Header;
