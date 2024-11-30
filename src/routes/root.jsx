import {
  UserCircleIcon,
  HomeIcon,
  CakeIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  CreditCardIcon,
  LockClosedIcon,
  PencilSquareIcon,
  ChartBarIcon,
  Squares2X2Icon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Root() {
  const [isExpanded, setIsExpanded] = useState(false);

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

        <NavItem
          to="/"
          icon={<HomeIcon className="w-6 h-6" />}
          label="Inicio"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/productos/alimentos"
          icon={<Squares2X2Icon className="w-6 h-6" />}
          label="Comida"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/productos/bebidas"
          icon={<ShoppingBagIcon className="w-6 h-6" />}
          label="Bebidas"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/productos/postres"
          icon={<CakeIcon className="w-6 h-6" />}
          label="Postres"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/gerente"
          icon={<UserGroupIcon className="w-6 h-6" />}
          label="Gerente"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/gerente/ventas"
          icon={<ChartBarIcon className="w-6 h-6" />}
          label="Ventas"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/gerente/productos/crear"
          icon={<Squares2X2Icon className="w-6 h-6" />}
          label="Productos"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/empleado/cobro"
          icon={<CreditCardIcon className="w-6 h-6" />}
          label="Cobro"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/login"
          icon={<LockClosedIcon className="w-6 h-6" />}
          label="Inicio de Sesión"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/register"
          icon={<PencilSquareIcon className="w-6 h-6" />}
          label="Registro"
          isExpanded={isExpanded}
        />
        <NavItem
          
          icon={<ArrowLeftEndOnRectangleIcon className="w-6 h-6" />}
          label="Cerrar Sesion"
          isExpanded={isExpanded}
        />
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
