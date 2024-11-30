import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query"; // Importando React Query
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";

// Criando o cliente de consulta (QueryClient)
const queryClient = new QueryClient();

// Definindo tipos para os componentes de página
type RouteType = {
  path: string;
  element: JSX.Element;
};

function App() {
  // Definindo as rotas
  const routes: RouteType[] = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/admin-dashboard", element: <AdminDashboard /> },
  ];

  return (
    // Envolvendo o aplicativo com o QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
