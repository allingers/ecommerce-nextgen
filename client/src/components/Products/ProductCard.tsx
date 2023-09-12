import React from 'react';
import "./Product.css";
import { Product } from '../../Intefaces/productTypes'; // Importera rätt Product-gränssnitt

interface ProductCardProps {
  product: Product; // Använd Product-gränssnittet från produkttypes.ts istället
  addToCart: (product: Product) => void; // Använd Product-gränssnittet även här
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const { name, price, image } = product;

  return (
    <div className="card">
      <img className="productImg" src={image} alt={`Bild på ${name}`} />
      <div className="productInformation">
        <h3>{name}</h3>
        <p className="price">{price.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' })}</p>
      </div>
      <div className="buyButton">
        <button onClick={() => addToCart(product)}>Lägg i kundvagn</button>
      </div>
    </div>
  );
};

export default ProductCard;

