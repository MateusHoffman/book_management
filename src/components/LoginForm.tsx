// import { useState } from 'react';

// const LoginForm = ({ onLogin }: { onLogin: (email: string, password: string) => void }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (email && password) {
//       onLogin(email, password);
//     } else {
//       setError('Todos os campos são obrigatórios');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-sm mx-auto bg-white shadow-lg rounded-md">
//       <h2 className="text-2xl font-semibold text-center">Login</h2>
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium">E-mail</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mt-2 border rounded-md"
//           placeholder="Digite seu e-mail"
//         />
//       </div>
//       <div>
//         <label htmlFor="password" className="block text-sm font-medium">Senha</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mt-2 border rounded-md"
//           placeholder="Digite sua senha"
//         />
//       </div>
//       <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//         Entrar
//       </button>
//     </form>
//   );
// };

// export default LoginForm;
