import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Root() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav
      className={`fixed bg-orange-100 transition-all duration-600 ${
        isExpanded ? "w-64" : "w-20"
      } h-screen overflow-y-auto`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ul className="flex flex-col items-center h-full space-y-2">
        <li className="w-full text-center bg-orange-100 text-white uppercase font-bold py-4 text-xl tracking-wider">
          <NavLink to="/" className="flex items-center justify-center">
            <span
              className={`${
                isExpanded ? "inline" : "hidden"
              } transition-all duration-600`}
            >
              SICESA
            </span>
          </NavLink>
        </li>

        <NavItem to="/" icon={<>🏠</>} label="Inicio" isExpanded={isExpanded} />
        <NavItem
          to="/comida"
          icon={<>🍔</>}
          label="Comida"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/bebidas"
          icon={<>🥤</>}
          label="Bebidas"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/postres"
          icon={<>🍰</>}
          label="Postres"
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
            isActive ? "bg-amber-700 text-white" : " text-amber-700"
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
