/* eslint-disable react/prop-types */
import { PlusIcon } from "@heroicons/react/16/solid";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/context";

export default function ItemCard(props) {
  const context = useContext(Context);
  const navigate = useNavigate();
  const { nombre_producto, precio, categoria, imagen } = props.props;

  const addProductsToCart = (productData) => {
    // Verificar si el usuario está logeado
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirigir al inicio de sesión si no está logeado
      navigate("/login");
      return;
    }
    // Añadir el producto al carrito
    context.setCartProducts([...context.cartProducts, productData]);
    context.openProductCart();
  };

  return (
    <div className="bg-white w-56 h-60 rounded-lg mb-5">
      <figure className="relative mb-2 w-full h-4/5">
        <span
          className="absolute bottom-0 left-0 bg-white/60 rounded-lg
                text-black text-xs
                m-2 px-3 py-0.5"
        >
          {categoria.nombrecategoria}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={imagen}
          alt={nombre_producto}
        />
        <div className="absolute top-0 right-0 flex justify-center items-center bg-white w-8 h-8 rounded-full m-2 p-1">
          <PlusIcon
            className="w-8 h-8 text-black cursor-pointer"
            onClick={() => addProductsToCart(props.props)}
          />
        </div>
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light">{nombre_producto}</span>
        <span className="text-lg font-medium">${precio}</span>
      </p>
    </div>
  );
}
