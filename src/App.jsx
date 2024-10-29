import { BrowserRouter, useRoutes } from "react-router-dom";
import Header from "./components/header";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Inicio from "./app/home/home";
import Layout from "./components/layout/layout";
const AppRoutes = () => {
  let routes = useRoutes([
      { path: "/", element: <Inicio /> },
      {path: "*", element: <ErrorPage />}
    ]);
  return routes;
};

export default function App() {
  return (
    <BrowserRouter>
      <Root />
      <Header titulo="hola" />
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}
