import { useContext, useState, useEffect } from "react";
import { ShoppingBagIcon } from "@heroicons/react/16/solid";
import ItemShoppingCar from "./itemShoppingCar";
import { Context } from "../../context/context";
import toast, { Toaster } from "react-hot-toast";

export default function ShoppingCart() {
  const context = useContext(Context);
  const productos = context.cartProducts;

  const [carrito, setCarrito] = useState([]);

  // Agrupar productos y calcular cantidades
  useEffect(() => {
    const agruparProductos = () => {
      const agrupado = productos.reduce((acumulador, producto) => {
        const existente = acumulador.find((item) => item.id === producto.id);
        if (existente) {
          existente.cantidad += 1; // Incrementar cantidad si ya existe
        } else {
          acumulador.push({ ...producto, cantidad: 1 }); // Agregar nuevo producto
        }
        return acumulador;
      }, []);
      return agrupado;
    };

    const nuevoCarrito = agruparProductos();
    setCarrito(nuevoCarrito);
  }, [productos]);

  // Manejar la cantidad de productos
  const aumentarCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === id && producto.cantidad < producto.cantidad_disponible
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito((prevCarrito) => {
      const actualizado = prevCarrito
        .map((producto) =>
          producto.id === id
            ? { ...producto, cantidad: producto.cantidad - 1 }
            : producto
        )
        .filter((producto) => producto.cantidad > 0); // Filtrar productos con cantidad > 0
      context.setCartProducts(
        actualizado.flatMap((producto) =>
          Array(producto.cantidad).fill(producto)
        )
      ); // Actualizar contexto
      return actualizado;
    });
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
  };

  const hacerPedido = async () => {
    const usuarioId = localStorage.getItem("Usuario");
    const token = localStorage.getItem("token");

    if (!usuarioId || !token) {
      toast.alert("No se encontró usuario o token en el almacenamiento local.");
      return;
    }

    // Crear el array de productosIds basado en las cantidades
    const productosIds = carrito.flatMap((producto) =>
      Array(producto.cantidad).fill(producto.id)
    );

    const pedido = {
      fecha_pedido: new Date().toISOString(),
      total_pedido: calcularTotal(),
      status: "Pendiente",
      usuarioId: parseInt(usuarioId, 10),
      productosIds,
    };

    try {
      const response = await fetch("http://localhost:8080/api/pedido/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pedido),
      });

      if (!response.ok) {
        throw new Error("Error al realizar el pedido.");
      }

      toast.success("Pedido realizado con éxito.");
      setCarrito([]); // Vaciar carrito local
      context.setCartProducts([]); // Vaciar carrito en el contexto
    } catch (error) {
      console.error("Error al hacer el pedido:", error);
      toast.alert(
        "Hubo un error al realizar el pedido. Por favor, intenta de nuevo."
      );
    }
  };

  return (
    <>
      <Toaster position="bottom-center" />

      <aside
        className={`fixed right-0 top-0 h-full w-80 bg-slate-100 shadow-lg flex-col ${
          context.isProductCartOpen ? `flex` : `hidden`
        }`}
      >
        {/* Encabezado */}
        <div className="bg-yellow-500 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Mi cesta de pedidos</h2>
          <ShoppingBagIcon
            className="h-8 text-slate-100 cursor-pointer"
            onClick={() => context.closeProductCart()}
          />
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto p-4">
          {carrito.map((producto) => (
            <ItemShoppingCar
              key={producto.id}
              nombre={producto.nombre_producto}
              precio={producto.precio}
              src={producto.imagen}
              cantidad={producto.cantidad}
              onAumentar={() => aumentarCantidad(producto.id)}
              onDisminuir={() => disminuirCantidad(producto.id)}
            />
          ))}
        </div>

        {/* Total y acciones */}
        <div className="p-4 border-t border-gray-300">
          <div className="flex justify-between mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-bold">
              ${calcularTotal().toFixed(2)}
            </span>
          </div>
          <div className="flex space-x-4">
            <button
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
              onClick={() => {
                setCarrito([]);
                context.setCartProducts([]); // Vaciar productos del contexto
              }}
            >
              Vaciar cesta
            </button>
            <button
              className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
              onClick={hacerPedido}
            >
              Hacer pedido
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
