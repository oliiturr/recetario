import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Recetas from './pages/Recetas'
import AgregarReceta from './pages/AgregarReceta'
import EditarReceta from './components/EditarReceta'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/agregar" element={<AgregarReceta />} />
        <Route path="/editar/:id" element={<EditarReceta />} />

      </Routes>
    </Router>
  )
}

export default App
