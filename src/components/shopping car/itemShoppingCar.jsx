/* eslint-disable react/prop-types */
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";

export default function ItemShoppingCar({
  nombre,
  precio,
  src,
  cantidad,
  onAumentar,
  onDisminuir,
}) {
  return (
    <div className=" flex items-center justify-between border-b rounded-lg border-gray-300 pb-4 mb-4">
      <div className="flex items-center">
        <img src={src} alt="Producto" className="w-12 h-12 rounded" />
        <div className="ml-4">
          <p className="font-bold">{nombre}</p>
          <p className="text-sm text-gray-600">${precio.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={onDisminuir}>
          <MinusIcon className="h-6 bg-amber-800 rounded-lg text-white" />
        </button>
        <span>{cantidad}</span>
        <button onClick={onAumentar}>
          <PlusIcon className="h-6 bg-amber-800 rounded-lg text-white" />
        </button>
      </div>
    </div>
  );
}
