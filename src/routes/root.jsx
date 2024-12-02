import { CubeIcon } from "@heroicons/react/16/solid";
import {
  UserCircleIcon,
  HomeIcon,
  UserGroupIcon,
  PencilSquareIcon,
  ChartBarIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import { BiSolidDrink } from "react-icons/bi";
import { GiCupcake } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";
import { FaCashRegister } from "react-icons/fa6";
import { MdAddToPhotos } from "react-icons/md";




export default function Root() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userRole, setUserRole] = useState(null); // Estado para el rol del usuario
  const navigate = useNavigate();

  // Verifica el rol del usuario desde localStorage
  useEffect(() => {
    const role = localStorage.getItem("Rol");
    setUserRole(role);
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Usuario");
    localStorage.removeItem("Correo");
    localStorage.removeItem("Rol");
    setUserRole(null);
    navigate("/");
  };

  return (
    <nav
      className={`fixed bg-orange-900 transition-all duration-600 ${
        isExpanded ? "w-56" : "w-20"
      } h-screen overflow-y-auto`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ul className="flex flex-col items-center h-full space-y-2">
        <li className="w-full text-center bg-orange-900 text-white uppercase font-bold py-4 text-xl tracking-wider">
          <NavLink to="/" className="flex items-center justify-center">
            <UserCircleIcon className="w-8 h-8" />
            <span
              className={`${
                isExpanded ? "inline" : "hidden"
              } transition-all duration-600`}
            >
              Perfil
            </span>
          </NavLink>
        </li>

        {/* Rutas comunes */}
        <NavItem
          to="/"
          icon={<HomeIcon className="w-6 h-6" />}
          label="Inicio"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/productos/alimentos"
          icon={<FaHamburger  className="w-6 h-6" />}
          label="Comida"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/productos/bebidas"
          icon={<BiSolidDrink className="w-6 h-6" />}
          label="Bebidas"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/productos/postres"
          icon={<GiCupcake className="w-6 h-6" />}
          label="Postres"
          isExpanded={isExpanded}
        />

        {/* Rutas para Gerente */}
        {userRole === "Gerente" && (
          <>
            <NavItem
              to="/gerente"
              icon={<UserGroupIcon className="w-6 h-6" />}
              label="Usuarios"
              isExpanded={isExpanded}
            />
            <NavItem
              to="/gerente/ventas"
              icon={<ChartBarIcon className="w-6 h-6" />}
              label="Resultados"
              isExpanded={isExpanded}
            />
            <NavItem
              to="/gerente/productos/crear"
              icon={<MdAddToPhotos className="w-6 h-6" />}
              label="Agregar Productos"
              isExpanded={isExpanded}
            />
            <NavItem
              to="/gerente/inventario"
              icon={<CubeIcon className="w-6 h-6" />}
              label="Inventario"
              isExpanded={isExpanded}
            />
          </>
        )}

        {/* Rutas para Empleado */}
        {userRole === "Empleado" && (
          <NavItem
            to="/empleado/cobro"
            icon={<FaCashRegister className="w-6 h-6" />}
            label="Cobro"
            isExpanded={isExpanded}
          />
        )}

        {/* Opciones de sesión */}
        {!userRole ? (
          <>
            <NavItem
              to="/login"
              icon={<BiLogIn className="w-6 h-6" />}
              label="Inicio de Sesión"
              isExpanded={isExpanded}
            />
            <NavItem
              to="/register"
              icon={<PencilSquareIcon className="w-6 h-6" />}
              label="Registro"
              isExpanded={isExpanded}
            />
          </>
        ) : (
          <li className="w-full">
            <button
              onClick={handleLogout}
              className="flex items-center h-20 font-semibold w-full text-amber-300 hover:text-white hover:bg-amber-700 transition-all duration-600"
            >
              <div className="w-16 flex justify-center">
                <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
              </div>
              <span
                className={`${isExpanded ? "inline-block" : "hidden"} ml-4`}
              >
                Cerrar Sesión
              </span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

// eslint-disable-next-line react/prop-types
function NavItem({ to, icon, label, isExpanded }) {
  return (
    <li className="w-full">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center h-20 font-semibold hover:text-white hover:bg-amber-700 transition-all duration-600 ${
            isActive ? "bg-amber-700 text-white" : " text-amber-300"
          }`
        }
      >
        <div className="w-16 flex justify-center">{icon}</div>
        <span className={`${isExpanded ? "inline-block" : "hidden"} ml-4`}>
          {label}
        </span>
      </NavLink>
    </li>
  );
}
