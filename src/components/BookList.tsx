import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchBooks, updateBook, deleteBook, createBook } from '../api/books';
import BookItem from '../components/BookItem';
import BookEditModal from '../components/BookEditModal';
import { Book } from '../types'; // Supondo que a interface `Book` esteja em um arquivo `types.ts`

const BookList: React.FC = () => {
  const queryClient = useQueryClient(); // Acesso ao cache do React Query para otimizar as atualizações

  // Tipando o resultado da query
  const { data: books, isLoading, isError } = useQuery<Book[], Error>('books', fetchBooks);

  // Definindo as mutações (update, delete e create) e tipando os parâmetros de entrada e saída
  const mutationUpdateBook = useMutation<void, Error, { bookId: number; updatedBook: Book }>(updateBook, {
    onSuccess: () => {
      queryClient.invalidateQueries('books'); // Invalida o cache para que a lista seja recarregada com os dados mais recentes
    },
  });

  const mutationDeleteBook = useMutation<void, Error, number>(deleteBook, {
    onSuccess: () => {
      queryClient.invalidateQueries('books'); // Invalida o cache após excluir o livro
    },
  });

  const mutationCreateBook = useMutation<void, Error, Book>(createBook, {
    onSuccess: () => {
      queryClient.invalidateQueries('books'); // Invalida o cache após criar um novo livro
    },
  });

  // Tipando o estado do livro selecionado e do estado do modal
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Tipando as funções que lidam com a criação, atualização e exclusão de livros
  const handleDeleteBook = (bookId: number): void => {
    mutationDeleteBook.mutate(bookId); // Chama a função de delete
  };

  const handleUpdateBook = (updatedBook: any) => {
    if (selectedBook && selectedBook.id !== undefined) {
      mutationUpdateBook.mutate({
        bookId: selectedBook.id, // Garante que id não é undefined
        updatedBook,
      }); // Chama a função de update
    } else {
      console.error('Selected book or id is undefined');
    }
  };

  const handleCreateBook = (newBook: Book): void => {
    mutationCreateBook.mutate(newBook); // Chama a função de criação do livro
  };

  const openModal = (book: Book): void => {
    setSelectedBook(book);
    setIsCreating(false); // Definir como edição
    setIsModalOpen(true);
  };

  const openCreateModal = (): void => {
    setSelectedBook(null);
    setIsCreating(true); // Definir como criação
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedBook(null); // Reset selected book when closing modal
  };

  if (isLoading) return <div>Carregando livros...</div>;
  if (isError) return <div>Erro ao carregar livros.</div>;

  return (
    <div>
      <div className='flex flex-row justify-between'>
        <h2 className="text-2xl font-semibold mb-4">Gerenciar Livros</h2>

        {/* Botão para Criar Novo Livro */}
        <button
          onClick={openCreateModal}
          className="mb-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Criar Novo Livro
        </button>
      </div>

      <div className="space-y-4">
        {books?.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onDelete={handleDeleteBook}
            onUpdate={openModal} // Passa a função de abrir o modal ao clicar no card ou no botão "Editar"
          />
        ))}
      </div>

      {/* Modal de Edição de Livro */}
      <BookEditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        book={selectedBook}
        onSave={isCreating ? handleCreateBook : handleUpdateBook} // Passa a função de salvar dependendo do contexto (criar ou editar)
      />
    </div>
  );
};

export default BookList;
