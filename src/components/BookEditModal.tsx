import React, { useState, useEffect } from "react";
import { Book } from "../types"; // Importe a interface Book, assumindo que esteja em `types.ts`

interface BookEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null; // Pode ser um livro ou null se estiver criando um novo
  onSave: (book: Book) => void; // Função que salva o livro (criação ou atualização)
}

const BookEditModal: React.FC<BookEditModalProps> = ({
  isOpen,
  onClose,
  book,
  onSave,
}) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Atualiza os estados de `title`, `author`, etc., quando o `book` mudar
  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setYear(book.year || "");
      setGenre(book.genre || "");
      setDescription(book.description || "");
    } else {
      // Limpa os campos ao abrir o modal para criar um novo livro
      setTitle("");
      setAuthor("");
      setYear("");
      setGenre("");
      setDescription("");
    }
  }, [book, isOpen]); // Reset os campos ao abrir o modal

  if (!isOpen) return null; // Não renderiza se o modal não estiver aberto

  const handleSave = () => {
    const newBook: Book = { title, author, year, genre, description };
    onSave(newBook); // Passa o livro atualizado ou o novo livro para o componente pai
    onClose(); // Fecha o modal após salvar
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()} // Fecha o modal ao clicar fora
    >
      <div
        className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg space-y-4 relative"
        style={{
          maxHeight: "90vh", // Altura máxima do modal
          overflowY: "auto", // Habilita rolagem quando o conteúdo exceder a altura
        }}
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal feche
      >
        {/* Botão de Fechar - X */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-3xl font-bold"
        >
          &times;
        </button>

        {/* Título do Modal */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          {book ? "Editar Livro" : "Criar Novo Livro"}
        </h2>

        {/* Campos Editáveis */}
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Autor"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Ano"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Gênero"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
            className="w-full p-2 border border-gray-300 rounded-md resize-y overflow-auto"
            rows={4}
            style={{
              maxHeight: "400px", // Limite de altura do textarea
              overflowY: "auto", // Habilita rolagem vertical
            }}
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookEditModal;
