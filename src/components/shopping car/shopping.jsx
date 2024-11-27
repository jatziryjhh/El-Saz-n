import { useContext, useState, useEffect } from "react";
import { ShoppingBagIcon } from "@heroicons/react/16/solid";
import ItemShoppingCar from "./itemShoppingCar";
import { Context } from "../../context/context";

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

  return (
    <>
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
            <button className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
              Hacer pedido
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
