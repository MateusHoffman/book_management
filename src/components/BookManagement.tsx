// import { useQuery, useMutation } from 'react-query';
// import { fetchBooks, updateBook, deleteBook, createBook } from '../api/books'; 
// import BookItem from './BookItem';

// const BookManagement = () => {
//   const { data: books, isLoading, isError } = useQuery('books', fetchBooks);
//   const mutationUpdateBook = useMutation(updateBook);
//   const mutationDeleteBook = useMutation(deleteBook);
//   const mutationCreateBook = useMutation(createBook);

//   const handleDeleteBook = (bookId: number) => {
//     mutationDeleteBook.mutate(bookId);
//   };

//   const handleUpdateBook = (bookId: number, updatedBook: any) => {
//     mutationUpdateBook.mutate({ bookId, updatedBook });
//   };

//   const handleCreateBook = (newBook: any) => {
//     mutationCreateBook.mutate(newBook);
//   };

//   if (isLoading) return <div>Carregando livros...</div>;
//   if (isError) return <div>Erro ao carregar livros.</div>;

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Gerenciar Livros</h2>
//       <div className="space-y-4">
//         {books?.map((book: any) => (
//           <BookItem
//             key={book.id}
//             book={book}
//             isLoggedIn={true} // Passa se o usuário está logado ou não
//             onClick={() => { /* Função de modal, se necessário */ }}
//             onDelete={handleDeleteBook} // Passa a função de deletar
//             onUpdate={handleUpdateBook} // Passa a função de atualizar
//           />
//         ))}
//       </div>
//       <button
//         onClick={() => handleCreateBook({ title: '', author: '', year: 2023 })}
//         className="bg-green-500 text-white py-2 px-6 rounded-lg"
//       >
//         Adicionar Livro
//       </button>
//     </div>
//   );
// };

// export default BookManagement;
