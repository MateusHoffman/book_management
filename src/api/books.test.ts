import { fetchBooks, updateBook, deleteBook, createBook } from './books';

// Mock da URL da API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Mock do `fetch`
global.fetch = jest.fn();

describe('Funções de livros da API', () => {

  // Testando a função fetchBooks
  test('fetchBooks deve buscar e retornar a lista de livros', async () => {
    const mockResponse = [{ id: 1, title: 'Test Book', author: 'Test Author' }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const books = await fetchBooks();
    expect(books).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/books`);
  });

  // Testando a função updateBook
  test('updateBook deve atualizar um livro corretamente', async () => {
    const updatedBook = { title: 'Updated Book', author: 'Updated Author' };
    const bookId = 1;

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: bookId, ...updatedBook }),
    });

    const response = await updateBook({ bookId, updatedBook });
    expect(response).toEqual({
      id: bookId,
      ...updatedBook,
    });
    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/books/${bookId}`,
      expect.objectContaining({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      })
    );
  });

  // Testando a função deleteBook
  test('deleteBook deve excluir um livro corretamente', async () => {
    const bookId = 1;

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Book deleted' }),
    });

    const response = await deleteBook(bookId);
    expect(response).toEqual({ message: 'Book deleted' });
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/books/${bookId}`, {
      method: 'DELETE',
    });
  });

  // Testando a função createBook
  test('createBook deve criar um novo livro corretamente', async () => {
    const newBook = { title: 'New Book', author: 'New Author' };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 2, title: newBook.title, author: newBook.author }),
    });

    const response = await createBook(newBook);
    expect(response).toEqual({
      id: 2,
      ...newBook,
    });
    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/books`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      })
    );
  });

  // Testando o erro no fetchBooks
  test('fetchBooks deve lançar erro quando não for possível buscar livros', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Erro ao buscar livros' }),
    });

    await expect(fetchBooks()).rejects.toThrow('Erro ao buscar livros');
  });

  // Testando o erro no updateBook
  test('updateBook deve lançar erro quando não for possível atualizar o livro', async () => {
    const updatedBook = { title: 'Updated Book', author: 'Updated Author' };
    const bookId = 1;

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Erro ao atualizar livro' }),
    });

    await expect(updateBook({ bookId, updatedBook })).rejects.toThrow('Erro ao atualizar livro');
  });

  // Testando o erro no deleteBook
  test('deleteBook deve lançar erro quando não for possível excluir o livro', async () => {
    const bookId = 1;

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Erro ao excluir livro' }),
    });

    await expect(deleteBook(bookId)).rejects.toThrow('Erro ao excluir livro');
  });

  // Testando o erro no createBook
  test('createBook deve lançar erro quando não for possível criar o livro', async () => {
    const newBook = { title: 'New Book', author: 'New Author' };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Erro ao criar livro' }),
    });

    await expect(createBook(newBook)).rejects.toThrow('Erro ao criar livro');
  });

  // Testando a resposta com status 404 (Not Found) no fetchBooks
  test('fetchBooks deve lançar erro se a API retornar 404', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Not Found' }),
    });

    await expect(fetchBooks()).rejects.toThrow('Erro ao buscar livros');
  });

  // Testando a resposta com status 500 (Internal Server Error) no fetchBooks
  test('fetchBooks deve lançar erro se a API retornar 500', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Internal Server Error' }),
    });

    await expect(fetchBooks()).rejects.toThrow('Erro ao buscar livros');
  });

  // Testando a resposta com status 400 (Bad Request) ao criar livro
  test('createBook deve lançar erro se a API retornar 400 (Bad Request)', async () => {
    const newBook = { title: 'New Book', author: 'New Author' };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Bad Request' }),
    });

    await expect(createBook(newBook)).rejects.toThrow('Erro ao criar livro');
  });

  // Testando o caso quando a resposta da API para fetchBooks é uma lista vazia
  test('fetchBooks deve retornar uma lista vazia se não houver livros', async () => {
    const mockResponse: any[] = [];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const books = await fetchBooks();
    expect(books).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/books`);
  });

  // Testando o comportamento ao atualizar um livro com dados inválidos
  test('updateBook deve lançar erro se os dados do livro forem inválidos', async () => {
    const updatedBook = { title: '', author: '' }; // Dados inválidos
    const bookId = 1;

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Dados inválidos' }),
    });

    await expect(updateBook({ bookId, updatedBook })).rejects.toThrow('Erro ao atualizar livro');
  });
});
