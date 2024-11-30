import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types'; // Importando o tipo Book

// Definindo a interface para as props do Modal
interface ModalProps {
  isOpen: boolean; // Determina se o modal está aberto ou fechado
  onClose: () => void; // Função para fechar o modal
  title: string; // Título do modal
  description: string; // Descrição do modal (não utilizada no JSX, mas pode ser útil para o conteúdo)
  isLoggedIn: boolean; // Determina se o usuário está logado ou não
  book: Book; // O livro que será mostrado no modal
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  isLoggedIn,
  book,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null; // Não renderiza o modal se não estiver aberto

  // Função para fechar o modal ao clicar fora dele
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // Fecha o modal se clicar na área escura
    }
  };

  // Função para redirecionar para a tela de login
  const handleLoginRedirect = (): void => {
    navigate('/login');
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick} // Adiciona o evento de clique na área de fundo
    >
      <div
        className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-lg max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl w-full shadow-lg space-y-4 relative transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()} // Impede o clique dentro do modal de fechar o modal
      >
        {/* Botão de Fechar - X no canto superior direito */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-3xl font-bold sm:top-3 sm:right-4 md:top-4 md:right-5"
        >
          &times;
        </button>

        {/* Título do Modal */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center sm:text-left">
          {title}
        </h2>

        {/* Conteúdo Condicional */}
        {isLoggedIn ? (
          <div>
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Ano:</strong> {book.year}</p>
            <p><strong>Gênero:</strong> {book.genre}</p>
            <p><strong>Páginas:</strong> {book.pages}</p>
            <p><strong>Descrição:</strong> {book.description}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Informações do Livro */}
            <div>
              <p className="text-lg sm:text-xl font-normal text-gray-800"><strong>Autor:</strong> {book.author}</p>
              <p className="text-lg sm:text-xl font-normal text-gray-800"><strong>Ano:</strong> {book.year}</p>
              <p className="text-lg sm:text-xl font-normal text-gray-800"><strong>Gênero:</strong> {book.genre}</p>
              <p className="text-lg sm:text-xl font-normal text-gray-800"><strong>Páginas:</strong> {book.pages}</p>
            </div>

            {/* Texto Informativo para Usuários Deslogados */}
            <p className="text-lg sm:text-xl font-medium text-red-600 bg-red-50 p-4 rounded-lg border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-all duration-300">
              Para ver todas as informações deste livro, <strong>faça login na sua conta</strong>.
              <br />
              <span className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                <span onClick={handleLoginRedirect} className="underline">Clique aqui para fazer login</span>
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
