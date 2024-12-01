import { useContext, useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  NumberedListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import TablePayRow from "../../../components/pay/TablePayRow";
import axios from "axios";
import PedidoModal from "../../../components/modal/pedidoModal/pedidoModal";
import { Context } from "../../../context/context";

export default function Cobro() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoToShow, setPedidoToShow] = useState({});
  const { openPedidoModal } = useContext(Context); // Función del contexto para abrir el modal
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/pedido/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sortedPedidos = response.data.data.sort((a, b) =>
          a.status === "Pendiente" && b.status !== "Pendiente" ? -1 : 1
        );
        setPedidos(sortedPedidos);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    };

    fetchPedidos();
  }, [token]);

  const handleStatusChange = async (pedido) => {
    const productosIds = pedido.productos.map((producto) => producto.id);

    const updatedPedido = {
      id_pedido: pedido.id_pedido,
      fecha_pedido: pedido.fecha_pedido,
      total_pedido: pedido.total_pedido,
      status: "Completado",
      usuarioId: pedido.usuario.id,
      productosIds,
    };

    try {
      await axios.put(
        `http://localhost:8080/api/pedido/${pedido.id_pedido}`,
        updatedPedido,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPedidos((prevPedidos) =>
        prevPedidos
          .map((p) =>
            p.id_pedido === pedido.id_pedido ? { ...p, status: "Completado" } : p
          )
          .sort((a, b) =>
            a.status === "Pendiente" && b.status !== "Pendiente" ? -1 : 1
          )
      );
    } catch (error) {
      console.error("Error al actualizar el pedido:", error);
    }
  };

  const handleViewPedido = (pedido) => {
    const pedidoResumen = pedido.productos.reduce((acc, producto) => {
      const existingProducto = acc.find((item) => item.id === producto.id);
      if (existingProducto) {
        existingProducto.cantidad += 1;
      } else {
        acc.push({ ...producto, cantidad: 1 });
      }
      return acc;
    }, []);

    setPedidoToShow({ ...pedido, productos: pedidoResumen });
    openPedidoModal();
  };


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
            <th className="py-3 px-4">Funciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <TablePayRow
                key={pedido.id_pedido}
                pedido={pedido}
                onStatusChange={handleStatusChange}
                onViewPedido={handleViewPedido}
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
      <PedidoModal pedido={pedidoToShow}/>
    </div>
  );
}
