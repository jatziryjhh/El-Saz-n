import { PlusCircleIcon } from "@heroicons/react/16/solid";
import axios from "axios";

export default function InventarioTableRow({
  id_producto,
  nombre_producto,
  descripcion,
  precio,
  cantidad,
  imagen,
  categoria,
  onUpdate,
}) {
  const handleAdd = async () => {
    try {
      const updatedCantidad = cantidad + 1;

      // Estructura del JSON para el PUT
      const updatedProducto = {
        id_producto,
        nombre_producto,
        descripcion,
        precio,
        cantidad_disponible: updatedCantidad,
        imagen,
        categoria,
      };

      // Realiza la petición PUT
      await axios.put(
        `http://localhost:8080/api/producto/${id_producto}`,
        updatedProducto,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Llama al callback para actualizar la tabla
      onUpdate(id_producto, updatedCantidad);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-4">{id_producto}</td>
      <td className="py-3 px-4">{nombre_producto}</td>
      <td className="py-3 px-4">{cantidad}</td>
      <td className="py-3 px-4">{`$${precio.toFixed(2)}`}</td>
      <td className="py-3 px-4">
        <div className="flex space-x-2">
          <button onClick={handleAdd}>
            <PlusCircleIcon className="w-6 h-6 text-amber-500 cursor-pointer" />
          </button>
        </div>
      </td>
    </tr>
  );
}
