import { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  NumberedListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import TablePayRow from "../../../components/pay/TablePayRow";
import axios from "axios";

export default function Cobro() {
  const [pedidos, setPedidos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/pedido/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        setPedidos(response.data.data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    };

    fetchPedidos();
  }, [token]);

  return (
    <div className="flex w-3/4 justify-center">
      <table className="bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-amber-800 text-left">
          <tr className="text-amber-100 uppercase text-sm tracking-wide">
            <th className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <NumberedListIcon className="w-5 h-5 text-gray-100" />
                <span>Num de Pedido</span>
              </div>
            </th>
            <th className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="w-5 h-5 text-gray-100" />
                <span>Cliente</span>
              </div>
            </th>
            <th className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <CurrencyDollarIcon className="w-5 h-5 text-gray-100" />
                <span>Precio</span>
              </div>
            </th>
            <th className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-5 h-5 text-gray-100" />
                <span>Estatus</span>
              </div>
            </th>
            <th className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <CalendarDaysIcon className="w-5 h-5 text-gray-100" />
                <span>Fecha de Entrega</span>
              </div>
            </th>
            <th className="py-3 px-4">Cobrar</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <TablePayRow
                key={pedido.id_pedido}
                id={pedido.id_pedido}
                nombreUsuario={`${pedido.usuario.nombre} ${pedido.usuario.apellidop}`}
                precio={pedido.total_pedido}
                estatus={pedido.status}
                fechaEntrega={new Date(
                  pedido.fecha_pedido
                ).toLocaleDateString()}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-3 px-4 text-center">
                No hay pedidos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
