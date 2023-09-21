import React from 'react';
import { Product } from '../../types/types';

import "./Product.css";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const { name, price, image } = product;

  return (
    <div className="card">
      <img className="productImg" src={image} />
      <div className="productInformation">
      <h3 title={name}>{name}</h3>
        <p className="price">{price} SEK</p>
      </div>
      <div className="buyButton">
        <button onClick={() => addToCart(product)}>Lägg i kundvagn</button>
      </div>
    </div>
  );
};

export default ProductCard;


