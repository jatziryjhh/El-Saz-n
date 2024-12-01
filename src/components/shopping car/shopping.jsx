import { useContext, useState, useEffect } from "react";
import ItemShoppingCar from "./itemShoppingCar";
import { Context } from "../../context/context";
import toast, { Toaster } from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ShoppingCart() {
  const context = useContext(Context);
  const productos = context.cartProducts;

  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const agruparProductos = () => {
      const agrupado = productos.reduce((acumulador, producto) => {
        const existente = acumulador.find((item) => item.id === producto.id);
        if (existente) {
          existente.cantidad += 1;
        } else {
          acumulador.push({ ...producto, cantidad: 1 });
        }
        return acumulador;
      }, []);
      return agrupado;
    };

    const nuevoCarrito = agruparProductos();
    setCarrito(nuevoCarrito);
  }, [productos]);

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
        .filter((producto) => producto.cantidad > 0);
      context.setCartProducts(
        actualizado.flatMap((producto) =>
          Array(producto.cantidad).fill(producto)
        )
      );
      return actualizado;
    });
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
  };

  const enviarCorreo = async (pedidoDetalles) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/api/enviar-correo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pedidoDetalles),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el correo.");
      }

      console.log("Correo enviado con éxito.");
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      toast.error("Hubo un error al enviar el correo. Por favor, intenta de nuevo.");
    }
  };

  const hacerPedido = async () => {
    const usuarioId = localStorage.getItem("Usuario");
    const token = localStorage.getItem("token");

    if (!usuarioId || !token) {
      toast.alert("No se encontró usuario o token en el almacenamiento local.");
      return;
    }

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
      const pedidoDetalles = {
        destinatario: localStorage.getItem("Correo"),
        asunto: "Detalles de pedido realizado",
        mensaje: `
            <h3>Productos Pedidos:</h3>
            <table style="width: 100%; border-collapse: collapse; background-color: #cc8613;">
                <thead style="background-color: #cc8613; color: white;">
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Producto</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Cantidad</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Precio unitario</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${carrito.map(producto => {
                        return `
                            <tr style="background-color: ${producto.cantidad % 2 === 0 ? '#e9ecef' : '#ffffff'};">
                                <td style="border: 1px solid #ddd; padding: 8px;">${producto.nombre_producto}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${producto.cantidad}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">$${producto.precio.toFixed(2)}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">$${(producto.cantidad * producto.precio).toFixed(2)}</td>
                            </tr>
                        `;
                    }).join("\n")}
                </tbody>
            </table>
            <h3 style="color: #000000;">Total de la compra: $${calcularTotal().toFixed(2)}</h3>
            
            <!-- Imagen de la empresa -->
            <div style="text-align: center; margin-top: 20px;">
                <img src="https://imgur.com/czoRRt4.png" alt="Logo de la empresa" style="max-width: 150px; height: auto;" />
            </div>
        `
    };
    
    console.log(JSON.stringify(pedidoDetalles, null, 2));
    
    

      await enviarCorreo(pedidoDetalles);

      toast.success("Pedido realizado con éxito.");
      setCarrito([]);
      context.setCartProducts([]);
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
          context.isProductCartOpen ? "flex" : "hidden"
        }`}
      >
        <div className="bg-yellow-500 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Mi cesta de pedidos</h2>
          <XMarkIcon
            className="h-8 text-slate-100 cursor-pointer"
            onClick={() => context.closeProductCart()}
          />
        </div>

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
                context.setCartProducts([]);
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
