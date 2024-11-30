import { useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query'; 
import BookCard from '../components/BookCard';
import { Book } from '../types';
import Header from '../components/Header'; 
import Modal from '../components/Modal'; 
import { fetchBooks } from '../api/books';

const Home = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // Estado para armazenar o livro selecionado
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para controlar a visibilidade do modal
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('currentUser')); // Estado para controlar login

  // Tipagem do retorno de `useQuery` para garantir que estamos manipulando os dados corretamente
  const { data: books, isLoading, isError, error }: UseQueryResult<Book[], Error> = useQuery('books', fetchBooks);

  // Função para abrir o modal e selecionar o livro
  const openModal = (book: Book): void => {
    setSelectedBook(book); // Define o livro selecionado
    setIsModalOpen(true); // Abre o modal
  };

  // Função para fechar o modal
  const closeModal = (): void => {
    setIsModalOpen(false); // Fecha o modal
    setSelectedBook(null); // Reseta o livro selecionado
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen relative">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> {/* Adicionando o Header na parte superior da página */}

      <div className="max-w-7xl mx-auto py-8 px-6 sm:px-8 lg:px-10">
        {/* Título da Página */}
        <h1 className="mt-20 text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 tracking-tight text-center mb-8 hover:scale-105 transition-all duration-300 ease-in-out">
          Lista de Livros
        </h1>

        {/* Exibição de estado de carregamento e erro */}
        {isLoading && <div className="text-center">Carregando livros...</div>}
        {isError && <div className="text-center text-red-500">Erro ao carregar livros: {error instanceof Error ? error.message : 'Erro desconhecido'}</div>}

        {/* Cards de Livros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 z-10">
          {/* Verifica se os livros estão disponíveis */}
          {books && books.length > 0 ? (
            books.map((book: Book) => (
              <BookCard
                key={book.id}
                book={book}
                isLoggedIn={isLoggedIn}
                onClick={() => openModal(book)} // Ao clicar no card, abre o modal
              />
            ))
          ) : (
            !isLoading && (
              <p className="flex justify-center items-center text-xl text-gray-500 col-span-full">Não há livros disponíveis.</p>
            )
          )}
        </div>
      </div>

      {/* Overlay escuro com opacidade de 50% */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeModal} // Fecha o modal quando clicar na área escura
        ></div>
      )}

      {/* Modal - Exibe se um livro foi selecionado */}
      {isModalOpen && selectedBook && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedBook.title}
          description={selectedBook.description}
          isLoggedIn={isLoggedIn} // Passa o estado de login
          book={selectedBook} // Passa o livro completo
        />
      )}
    </div>
  );
};

export default Home;
