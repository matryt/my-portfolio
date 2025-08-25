import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import ProjectDetail from './pages/ProjectDetails/ProjectDetails';
import Projects from './pages/ProjectList/Projects';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projets/:projectName" element={<ProjectDetail />} />
        <Route path="/projets" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
