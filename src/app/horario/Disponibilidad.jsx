import { useContext } from "react";
import { Context } from "../../context/context";

export default function Disponibilidad() {
  const context = useContext(Context);
  return (
    <div
      className={`fixed inset-0 ${
        context.horarioDisponible ? "hidden" : "flex"
      } flex-col items-center justify-center bg-[#D6C4A0] z-50`}
    >
      <img
        src="/img/icons/LoginLogoNoBG.png"
        alt="Logo del sistema"
        className="w-[400px] mb-5"
      />
      <h1 className="text-2xl text-[#5B3A29]">Sistema no disponible</h1>
    </div>
  );
}
