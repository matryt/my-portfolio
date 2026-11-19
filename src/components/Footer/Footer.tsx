import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-left">
          <a href="mailto:hello@mathieucuvelier.fr" className="footer-email">
            [EMAIL]
          </a>
        </div>
        <div className="footer-right">
          <a 
            href="https://github.com/matryt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            GITHUB
          </a>
          <span className="footer-sep">·</span>
          <a 
            href="https://linkedin.com/in/mathieu-cuvelier" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
