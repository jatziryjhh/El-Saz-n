import { createContext, useState } from "react";

export const Context = createContext();

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isProductCartOpen, setIsProductCartOpen] = useState(false);
  const openProductCart = () => setIsProductCartOpen(true);
  const closeProductCart = () => setIsProductCartOpen(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [isPedidoModalOpen, setIsPedidoModalOpen] = useState(false);
  const openPedidoModal = () => setIsPedidoModalOpen(true);
  const closePedidoModal = () => setIsPedidoModalOpen(false);
  const [pedidoToShow, setPedidoToShow] = useState({});
  //Comprobrar si el horario esta disponible de 6AM a 9PM
  const hora = new Date().getHours();
  const min = new Date().getMinutes();
  const horaActual = hora + min / 60;
  const horarioDisponible = horaActual >= 6 && horaActual <= 21;
  console.log(horarioDisponible);

  return (
    <Context.Provider
      value={{
        count,
        setCount,
        isProductCartOpen,
        openProductCart,
        closeProductCart,
        cartProducts,
        setCartProducts,
        isPedidoModalOpen,
        openPedidoModal,
        closePedidoModal,
        pedidoToShow,
        setPedidoToShow,
        horarioDisponible,
      }}
    >
      {children}
    </Context.Provider>
  );
};
