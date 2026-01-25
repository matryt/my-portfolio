import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import ProjectDetail from './pages/ProjectDetails/ProjectDetails';
import Projects from './pages/ProjectList/Projects';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets/:projectName" element={<ProjectDetail />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App
