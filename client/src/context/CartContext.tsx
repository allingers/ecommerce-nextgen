import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../Intefaces/productTypes';


interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalCost: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart måste användas inom en CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const existingCartItem = cart.find((item) => item.id === product.id);

    if (existingCartItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalCost = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCost,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};


