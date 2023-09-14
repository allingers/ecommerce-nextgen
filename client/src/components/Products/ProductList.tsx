import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types/types';
import { useCart } from '../../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json() as Promise<Product[]>)
      .then((data) => setProducts(data))
      .catch((error) => console.error('Fel vid hämtning av produkter:', error));
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.price}
          product={product} // Skicka hela produktobjektet som en egenskap
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;

