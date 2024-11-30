import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Tipo para o elemento root
const rootElement = document.getElementById('root') as HTMLElement | null;

// Garantir que rootElement não seja nulo antes de renderizar
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
