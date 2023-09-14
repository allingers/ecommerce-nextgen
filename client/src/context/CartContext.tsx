import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../types/types';

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


  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const existingCartItem = cart.find((item) => item.price === product.price);

    if (existingCartItem) {
      const updatedCart = cart.map((item) =>
        item.price === product.price ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.price !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalCost = () => {
    return cart.reduce((total, product) => total + product.defaultPrice * product.quantity, 0);
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
