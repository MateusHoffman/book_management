// import { useState } from 'react';

// const BookForm = ({ onSubmit, initialData }: { onSubmit: (book: any) => void, initialData?: any }) => {
//   const [title, setTitle] = useState(initialData?.title || '');
//   const [author, setAuthor] = useState(initialData?.author || '');
//   const [year, setYear] = useState(initialData?.year || '');
//   const [description, setDescription] = useState(initialData?.description || '');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({ title, author, year, description });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-sm mx-auto bg-white shadow-lg rounded-md">
//       <h2 className="text-2xl font-semibold text-center">{initialData ? 'Editar Livro' : 'Adicionar Livro'}</h2>
//       <div>
//         <label htmlFor="title" className="block text-sm font-medium">Título</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 mt-2 border rounded-md"
//         />
//       </div>
//       <div>
//         <label htmlFor="author" className="block text-sm font-medium">Autor</label>
//         <input
//           type="text"
//           id="author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           className="w-full p-2 mt-2 border rounded-md"
//         />
//       </div>
//       <div>
//         <label htmlFor="year" className="block text-sm font-medium">Ano</label>
//         <input
//           type="text"
//           id="year"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           className="w-full p-2 mt-2 border rounded-md"
//         />
//       </div>
//       <div>
//         <label htmlFor="description" className="block text-sm font-medium">Descrição</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-2 mt-2 border rounded-md"
//         />
//       </div>
//       <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//         {initialData ? 'Editar' : 'Adicionar'}
//       </button>
//     </form>
//   );
// };

// export default BookForm;
