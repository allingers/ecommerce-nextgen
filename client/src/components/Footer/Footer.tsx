import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer top">
      <div className="container">
      <a href="#top" onClick={scrollToTop}>
    <span>&#8593;</span> Till toppen <span>&#8593;</span>
        </a>
        <p>&copy; {new Date().getFullYear()} NextGen AB</p>
      </div>
    </footer>
  );
};

export default Footer;
