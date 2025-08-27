import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.scss';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Détecter le scroll pour changer l'apparence du header et la section active
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Détecter la section active
      if (location.pathname === '/') {
        const sections = ['about', 'parcours'];
        const scrollPosition = window.scrollY + 100; // Offset pour la détection

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(sectionId);
              break;
            }
          }
        }

        // Si on est en haut de la page, aucune section n'est active
        if (window.scrollY < 200) {
          setActiveSection('');
        }
      }
    };

    handleScroll(); // Appel initial
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Fonction pour scroller vers une section spécifique
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Offset pour le header fixe
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isHomePage = location.pathname === '/';

  // Animation d'apparition du menu après l'animation d'accueil
  useEffect(() => {
    if (isHomePage) {
      // Sur la page d'accueil, attendre la fin de l'animation hero (2.5s)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2500);
      
      return () => clearTimeout(timer);
    } else {
      // Sur les autres pages, afficher immédiatement
      setIsVisible(true);
    }
  }, [isHomePage]);

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="nav-container">
        {/* Logo/Nom */}
        <Link to="/" className="nav-logo">
          <span className="logo-text">Mathieu Cuvelier</span>
        </Link>

        {/* Menu Desktop */}
        <ul className="nav-menu">
          <li className="nav-item">
            {isHomePage ? (
              <button
                className={`nav-link nav-button ${activeSection === '' ? 'active' : ''}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Accueil
              </button>
            ) : (
              <Link to="/" className={`nav-link`}>
                Accueil
              </Link>
            )}
          </li>
          {isHomePage && (
            <>
              <li className="nav-item">
                <button 
                  onClick={() => scrollToSection('about')} 
                  className={`nav-link nav-button ${activeSection === 'about' ? 'active' : ''}`}
                >
                  À propos
                </button>
              </li>
              <li className="nav-item">
                <button 
                  onClick={() => scrollToSection('parcours')} 
                  className={`nav-link nav-button ${activeSection === 'parcours' ? 'active' : ''}`}
                >
                  Parcours
                </button>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link 
              to="/projets" 
              className={`nav-link ${location.pathname === '/projets' ? 'active' : ''}`}
            >
              Projets
            </Link>
          </li>
          <li className="nav-item">
            <a 
              href="mailto:hello@mathieucuvelier.fr" 
              className="nav-link nav-cta"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Burger Menu */}
        <button 
          className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu Mobile */}
        <div className={`nav-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-mobile-menu">
            <li className="nav-mobile-item">
              {isHomePage ? (
                <button
                  className={`nav-mobile-link nav-mobile-button ${activeSection === '' ? 'active' : ''}`}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Accueil
                </button>
              ) : (
                <Link
                  to="/"
                  className={`nav-mobile-link ${activeSection === '' ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accueil
                </Link>
              )}
            </li>
            {isHomePage && (
              <>
                <li className="nav-mobile-item">
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className={`nav-mobile-link nav-mobile-button ${activeSection === 'about' ? 'active' : ''}`}
                  >
                    À propos
                  </button>
                </li>
                <li className="nav-mobile-item">
                  <button 
                    onClick={() => scrollToSection('parcours')} 
                    className={`nav-mobile-link nav-mobile-button ${activeSection === 'parcours' ? 'active' : ''}`}
                  >
                    Parcours
                  </button>
                </li>
              </>
            )}
            <li className="nav-mobile-item">
              <Link 
                to="/projets" 
                className={`nav-mobile-link ${location.pathname === '/projets' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projets
              </Link>
            </li>
            <li className="nav-mobile-item">
              <a 
                href="mailto:hello@mathieucuvelier.fr" 
                className="nav-mobile-link nav-mobile-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
