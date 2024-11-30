import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser, isValidEmail, isValidPassword } from '../utils/auth'; // Importando as funções utilitárias
import { User } from '../types'; // Supondo que você tenha o tipo User

// Tipagem para o estado do erro do formulário
type FormError = string | undefined;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null); // Estado para armazenar o erro
  const [email, setEmail] = useState<string>(''); // Estado para armazenar o e-mail
  const [password, setPassword] = useState<string>(''); // Estado para armazenar a senha
  const [formError, setFormError] = useState<FormError>(''); // Estado para erro do formulário
  const [isLoading, setIsLoading] = useState(false); // Estado para controle do carregamento

  // Função para gerenciar o redirecionamento após o login
  const handleRedirection = (user: User) => {
    // Salva o usuário no localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Redireciona dependendo do tipo de usuário
    if (user.role === 'admin') {
      navigate('/admin-dashboard'); // Redireciona para o dashboard de admin
    } else {
      navigate('/'); // Redireciona para a home page
    }
  };

  // Função para tratar o login
  const handleLogin = async (): Promise<void> => {
    setFormError('');
    setError(null);
    setIsLoading(true);

    if (!email || !isValidEmail(email)) {
      setFormError('Por favor, insira um e-mail válido.');
      setIsLoading(false);
      return;
    }

    if (!password || !isValidPassword(password)) {
      setFormError('Por favor, insira sua senha.');
      setIsLoading(false);
      return;
    }

    try {
      const user = await authenticateUser(email, password);
      if (user) {
        handleRedirection(user); // Redireciona o usuário após login bem-sucedido
      } else {
        setError('Credenciais inválidas!');
      }
    } catch (err) {
      setError('Ocorreu um erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para redirecionar para a tela de cadastro
  const handleSignupRedirect = () => {
    navigate('/signup'); // Redireciona para a página de cadastro
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 text-center mb-6">
          Login
        </h2>

        {/* Exibição de erro do formulário */}
        {formError && (
          <div className="text-red-600 bg-red-100 p-4 rounded-lg border-l-4 border-red-500 mb-4">
            {formError}
          </div>
        )}

        {/* Exibição de erro do backend ou erro global */}
        {error && (
          <div className="text-red-600 bg-red-100 p-4 rounded-lg border-l-4 border-red-500 mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            onClick={handleLogin}
            disabled={isLoading} // Desabilita o botão durante o processo de login
          >
            {isLoading ? 'Carregando...' : 'Entrar'}
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Não tem uma conta? </span>
          <span
            className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 underline"
            onClick={handleSignupRedirect}
          >
            Cadastre-se
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
