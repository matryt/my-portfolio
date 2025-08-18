import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetails/ProjectDetails';
import Projects from './components/ProjectList/Projects';

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
