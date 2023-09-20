import React from 'react';
import "./Product.css";
import { Product } from '../../types/types';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const { name, price, image } = product;

  return (
    <div className="card">
      <img className="productImg" src={image} alt={`Bild på ${name}`} />
      <div className="productInformation">
        <h3>{name}</h3>
        <p className="price">{price} SEK</p>
      </div>
      <div className="buyButton">
        <button onClick={() => addToCart(product)}>Lägg i kundvagn</button>
      </div>
    </div>
  );
};

export default ProductCard;


