  import { BrowserRouter, useRoutes } from "react-router-dom";
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

  const AppRoutes = () => {
    let routes = useRoutes([
      { path: "/", element: <Inicio /> },
      { path: "*", element: <ErrorPage /> },
      { path: "/login", element: <Login /> },
      { path: "/gerente", element: <GerenteHome /> },
      { path: "/gerente/ventas", element: <Ventas /> },
      { path: "/gerente/productos/crear", element: <CrearProductos /> },
      { path: "/empleado/cobro", element: <Cobro /> },
      { path: "/register", element: <Registro /> },
      { path: "/productos/:categoria", element: <ProductosCategoria /> },
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
