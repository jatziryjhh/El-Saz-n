import { useEffect, useState } from "react";
import axios from "axios";
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  HashtagIcon,
  NumberedListIcon,
} from "@heroicons/react/16/solid";
import InventarioTableRow from "../../../components/table/inventario/inventarioTableRow";

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/producto/visualizar",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProductos(response.data.data || []);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, [token]);

  const handleUpdate = (id, newCantidad) => {
    // Actualiza la cantidad del producto en el estado local
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad_disponible: newCantidad }
          : producto
      )
    );
  };

  return (
    <div className="flex w-3/4 justify-center">
      <table className="bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-amber-800 text-left">
          <tr className="text-amber-100 uppercase text-sm tracking-wide">
            <th className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <NumberedListIcon className="w-5 h-5 text-gray-100" />
                <span>Id</span>
              </div>
            </th>
            <th className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <DocumentTextIcon className="w-5 h-5 text-gray-100" />
                <span>Nombre</span>
              </div>
            </th>
            <th className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <HashtagIcon className="w-5 h-5 text-gray-100" />
                <span>Cantidad</span>
              </div>
            </th>
            <th className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <CurrencyDollarIcon className="w-5 h-5 text-gray-100" />
                <span>Precio</span>
              </div>
            </th>
            <th className="py-3 px-4">Funciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {productos.map((producto) => (
            <InventarioTableRow
              key={producto.id}
              id_producto={producto.id}
              nombre_producto={producto.nombre_producto}
              descripcion={producto.descripcion}
              precio={producto.precio}
              cantidad={producto.cantidad_disponible}
              imagen={producto.imagen}
              categoria={producto.categoria}
              onUpdate={handleUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
