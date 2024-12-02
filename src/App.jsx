/* eslint-disable react/prop-types */
import { BrowserRouter, useRoutes, Navigate } from "react-router-dom";
import Header from "./components/header";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Inicio from "./app/home/home";
import Layout from "./components/layout/layout";
import Login from "./app/login/login";
import GerenteHome from "./app/gerente/gerenteHome";
import Ventas from "./app/gerente/ventas/ventas";
import CrearProductos from "./app/gerente/gestion/productos";
import Cobro from "./app/empleado/cobro/cobro";
import { ContextProvider } from "./context/context";
import ShoppingCart from "./components/shopping car/shopping";
import Registro from "./app/register/registro";
import ProductosCategoria from "./app/ProductosCategoria/ProductosCategoria";
import Disponibilidad from "./app/horario/Disponibilidad";
import Inventario from "./app/gerente/inventario/inventario";

const PrivateRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem("Rol"); // Recupera el rol del usuario desde el localStorage

  // Verifica si el rol del usuario está permitido
  return allowedRoles.includes(userRole) ? (
    element
  ) : (
    <Navigate to="/" replace />
  );
};

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Inicio /> },
    { path: "*", element: <ErrorPage /> },
    { path: "/login", element: <Login /> },
    {
      path: "/gerente",
      element: (
        <PrivateRoute element={<GerenteHome />} allowedRoles={["Gerente"]} />
      ),
    },
    {
      path: "/gerente/ventas",
      element: <PrivateRoute element={<Ventas />} allowedRoles={["Gerente"]} />,
    },
    {
      path: "/gerente/productos/crear",
      element: (
        <PrivateRoute element={<CrearProductos />} allowedRoles={["Gerente"]} />
      ),
    },
    {
      path: "/empleado/cobro",
      element: (
        <PrivateRoute
          element={<Cobro />}
          allowedRoles={["Empleado", "Gerente"]}
        />
      ),
    },
    { path: "/register", element: <Registro /> },
    { path: "/horario", element: <Disponibilidad /> },
    {
      path: "/productos/:categoria",
      element: <ProductosCategoria />,
    },
    {
      path: "/gerente/inventario",
      element: (
        <PrivateRoute element={<Inventario />} allowedRoles={["Gerente"]} />
      ),
    },
  ]);
  return routes;
};

export default function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Root />
        <Header titulo="El Sazon" />
        <Layout>
          <AppRoutes />
        </Layout>
        <ShoppingCart />
      </BrowserRouter>
    </ContextProvider>
  );
}
