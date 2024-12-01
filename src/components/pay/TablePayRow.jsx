/* eslint-disable react/prop-types */
import {
  CreditCardIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export default function TablePayRow({ pedido, onStatusChange, onViewPedido }) {
  const { id_pedido, usuario, total_pedido, status, fecha_pedido } = pedido;

  const handleCobrar = () => {
    if (status === "Pendiente") {
      onStatusChange(pedido);
    }
  };

  const handleViewPedido = () => {
    onViewPedido(pedido);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-4">{id_pedido}</td>
      <td className="py-3 px-4">{`${usuario.nombre} ${usuario.apellidop}`}</td>
      <td className="py-3 px-4">${total_pedido}</td>
      <td className="py-3 px-4">
        <span
          className={`${
            status === "Pendiente"
              ? "text-red-600 bg-red-100"
              : "bg-green-100 text-green-600"
          } py-1 px-3 rounded-full text-xs`}
        >
          {status}
        </span>
      </td>
      <td className="py-3 px-4">
        {new Date(fecha_pedido).toLocaleDateString()}
      </td>
      <td className="py-3 px-4">
        <div className="flex space-x-2">
          <MagnifyingGlassIcon
            onClick={handleViewPedido}
            className="w-10 h-10 p-2 rounded-lg text-amber-100 bg-amber-900 cursor-pointer"
          />
          <CreditCardIcon
            onClick={handleCobrar}
            className="w-10 h-10 p-2 rounded-lg text-amber-100 bg-amber-900 cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
}
