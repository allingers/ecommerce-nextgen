import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

// Definiera en typ för produktobjektet
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]); // Använd den definierade typen här

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json() as Promise<Product[]>) // Ange typen här
      .then((data) => setProducts(data))
      .catch((error) => console.error('Fel vid hämtning av produkter:', error));
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default ProductList;


