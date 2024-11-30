import React from 'react';
import { Book } from '../types'; // Supondo que a interface Book esteja nesse caminho

interface BookCardProps {
  book: Book;
  isLoggedIn: boolean;
  onClick: () => void; // Função de clique, não espera argumentos e não retorna nada
}

const BookCard: React.FC<BookCardProps> = ({ book, isLoggedIn, onClick }) => {
  return (
    <div
      className="bg-gradient-to-r from-white via-gray-100 to-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl space-y-4 cursor-pointer"
      onClick={onClick} // Ao clicar no card, chama a função onClick da Home
    >
      {/* Título do livro com truncamento de 2 linhas */}
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 transition-colors duration-300 hover:text-indigo-600 line-clamp-2">
        {book.title}
      </h3>

      {/* Autor do livro */}
      <p className="text-sm sm:text-base text-gray-700">{book.author}</p>

      {/* Ano de publicação */}
      <p className="text-sm sm:text-base text-gray-500">{book.year}</p>

      {/* Gênero */}
      <p className="text-sm sm:text-base text-gray-500">{book.genre}</p>

      {/* Páginas */}
      <p className="text-sm sm:text-base text-gray-500">{book.pages} páginas</p>
    </div>
  );
};

export default BookCard;
