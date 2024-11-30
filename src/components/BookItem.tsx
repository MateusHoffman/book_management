import React from 'react';
import { Book } from '../types'; // Supondo que a interface Book esteja em `types.ts`

interface BookItemProps {
  book: Book; // Tipando o parâmetro `book` como sendo do tipo Book
  onDelete: (bookId: number) => void; // Função que recebe o `bookId` (número)
  onUpdate: (book: Book) => void; // Função que recebe o objeto `book`
}

const BookItem: React.FC<BookItemProps> = ({ book, onDelete, onUpdate }) => {
  // Impede a propagação do clique nos botões de "Editar" ou "Deletar"
  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate(book); // Passa o livro inteiro para abrir o modal com os dados
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique nos botões abra o modal
  
    // Verifica se book.id é um número antes de chamar a função onDelete
    if (book.id !== undefined) {
      onDelete(book.id); // Passa o id do livro para deletar
    } else {
      console.error('Book id is undefined');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-row justify-between items-center">
      <h3 className="font-semibold">{book.title}</h3>
      <div className="flex gap-3">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white p-2 rounded mt-2"
        >
          Deletar
        </button>
      </div>
    </div>
  );
};

export default BookItem;
