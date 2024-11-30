import { Link, useNavigate } from 'react-router-dom';  // Adicionando o Link aqui

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
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 gap-4">
        <div className="text-white text-3xl font-extrabold">
          Gerenciador de <span className="text-yellow-400">livros</span>
        </div>

        {/* Condicionalmente renderiza os botões */}
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button
                onClick={handleAdminDashboardRedirect}
                className="text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-black hover:bg-opacity-50 transition-colors"
              >
                Dashboard
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-yellow-400 text-indigo-800 py-2 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition-colors">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
