// Tipagem para o tipo de role do usuário
export type UserRole = 'user' | 'admin'; // O tipo para role

// Interface para o usuário
export interface User {
  id: number;
  email: string;
  password: string;
  role: UserRole; // Role só pode ser 'user' ou 'admin'
}

// Interface para o livro
export interface Book {
  id?: number; // O ID é opcional, pois ele pode ser atribuído automaticamente
  title: string;
  author: string;
  year: string;
  genre: string;
  description: string;
  language?: string; // O idioma pode ser opcional
  publisher?: string; // A editora pode ser opcional
  pages?: number; // O número de páginas pode ser opcional
  isbn?: string; // O ISBN pode ser opcional
}
