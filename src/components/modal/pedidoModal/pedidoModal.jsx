/* eslint-disable react/prop-types */
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Context } from "../../../context/context";
import { useContext } from "react";

export default function PedidoModal({ pedido }) {
    const { productos = [], total_pedido = 0, usuario = {} } = pedido;
    const context = useContext(Context);
  
    return (
      <div className={context.isPedidoModalOpen ? "flex" : "hidden"}>
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/4 h-3/4 my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold">Pedido de {usuario.nombre}</h3>
                  <XMarkIcon
                    className="w-10 h-10 text-gray-500 cursor-pointer"
                    onClick={() => context.closePedidoModal()}
                  />
                </div>
                <div className="px-6 py-4 overflow-y-auto">
                  {productos.map((producto) => (
                    <div
                      key={producto.id}
                      className="flex justify-between border-b py-2"
                    >
                            <img src={producto.imagen} alt="Producto" className="w-12 h-12 rounded" />
                      <span className="font-semibold">{producto.nombre_producto}</span>
                      <span className="font-">{producto.cantidad}x</span>
                      <span className="text-sm text-gray-900  font-semibold  ">${(producto.precio * producto.cantidad).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between m-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold">${total_pedido.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    );
  }
  
  