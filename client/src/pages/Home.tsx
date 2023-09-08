import React from 'react';
import ProductList from '../components/Products/ProductList';

const Home: React.FC = () => {
  return (
    <div className='homePage-container'>
      <ProductList />
    </div>
  );
};

export default Home;
