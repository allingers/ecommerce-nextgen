import React from 'react';
import "./Product.css"

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
  return (
    <div className="card">
      <img className="productImg" src={image} alt={`Bild på ${name}`} />
      <div className="productInformation">
      <h3>{name}</h3>
      <p className="price">{price.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' })}</p>
      </div>
      <div className="buyButton">
        <button>Lägg till i kundvagn</button>
      </div>
    </div>
  );
};

export default ProductCard;

