import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProjectDetail from './pages/ProjectDetails/ProjectDetails';
import Projects from './pages/ProjectList/Projects';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projets/:projectName" element={<ProjectDetail />} />
        <Route path="/projets" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
