import { createContext, useState } from "react";

export const Context = createContext();

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isProductCartOpen, setIsProductCartOpen] = useState(false);
  const openProductCart = () => setIsProductCartOpen(true);
  const closeProductCart = () => setIsProductCartOpen(false);
  const [cartProducts, setCartProducts] = useState([]);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};
