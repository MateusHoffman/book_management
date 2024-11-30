import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o cadastro
import { createUser } from '../api/users'; // Função para chamar a API para criar um usuário

// Tipagem para o erro de cadastro
type ErrorMessage = string | null;

const Signup: React.FC = () => {
  // Tipagem do estado do componente
  const [email, setEmail] = useState<string>(''); // Estado para o email
  const [password, setPassword] = useState<string>(''); // Estado para a senha
  const [error, setError] = useState<ErrorMessage>(''); // Estado para erros
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para controle de loading
  const navigate = useNavigate(); // Navegação entre páginas

  // Função para validar o formato do e-mail
  const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  // Função para validar o comprimento da senha
  const isValidPassword = (password: string): boolean => {
    return password.length >= 6; // A senha deve ter pelo menos 6 caracteres
  };

  // Função para realizar o cadastro
  const handleSignup = async (): Promise<void> => {
    setIsLoading(true);
    setError(''); // Reseta o erro

    // Validações
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError('E-mail inválido.');
      setIsLoading(false);
      return;
    }

    if (!isValidPassword(password)) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    try {
      // Chama a função de criação de usuário
      await createUser({ email, password });

      // Redireciona para a tela de login após sucesso
      navigate('/login');
    } catch (err: any) {
      setError(err.message); // Define o erro recebido
    } finally {
      setIsLoading(false); // Finaliza o processo de loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 text-center mb-6">
          Cadastro
        </h2>

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
            onClick={handleSignup}
            disabled={isLoading} // Desabilita o botão durante o processo de cadastro
          >
            {isLoading ? 'Carregando...' : 'Cadastrar'}
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Já tem uma conta? </span>
          <span
            className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 underline"
            onClick={() => navigate('/login')} // Redireciona para o login
          >
            Entre aqui
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
