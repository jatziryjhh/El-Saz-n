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
      }}
    >
      {children}
    </Context.Provider>
  );
};
