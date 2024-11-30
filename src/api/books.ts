// api/books.tsx

const API_URL = process.env.REACT_APP_API_URL; // Pegando a URL da API do .env

// Função para buscar livros da API
export const fetchBooks = async () => {
  const response = await fetch(`${API_URL}/books`);
  if (!response.ok) {
    throw new Error('Erro ao buscar livros');
  }
  return response.json();
};

// Função para atualizar um livro na API
export const updateBook = async ({ bookId, updatedBook }: { bookId: number; updatedBook: any }) => {
  const response = await fetch(`${API_URL}/books/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedBook),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar livro');
  }

  return response.json();
};

// Função para deletar um livro na API
export const deleteBook = async (bookId: number) => {
  const response = await fetch(`${API_URL}/books/${bookId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir livro');
  }

  return response.json();
};

// Função para criar um novo livro na API
export const createBook = async (newBook: any) => {
  const response = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar livro');
  }

  return response.json();
};

