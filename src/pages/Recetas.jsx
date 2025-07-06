import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import RecetaCard from '../components/RecetaCard'
import FiltroBar from '../components/FiltroBar'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
function Recetas() {
  const location = useLocation()
  const [toast, setToast] = useState('')
  const [recetas, setRecetas] = useState([])
  const [filtro, setFiltro] = useState({ gusto: '', categorias: [], buscar: '' })
  const [mostrarFiltros, setMostrarFiltros] = useState(false) // 👈 NUEVO

  useEffect(() => {
    if (location.state?.mensaje) {
      setToast(location.state.mensaje)
      // Limpia el mensaje de la URL (opcional)
      window.history.replaceState({}, document.title)
      // Oculta el toast luego de 3 segundos
      setTimeout(() => setToast(''), 3000)
    }
  }, [location.state])

  useEffect(() => {
    const q = query(collection(db, 'recetas'), orderBy('pagina'))
    const unsubscribe = onSnapshot(q, snapshot => {
      const recetasData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setRecetas(recetasData)
    })
    return () => unsubscribe()
  }, [])

  const recetasFiltradas = recetas.filter(receta => {
    const texto = filtro.buscar.toLowerCase()
const nombreCoincide = receta.nombre.toLowerCase().includes(texto)
const autorCoincide = (receta.autor || '').toLowerCase().includes(texto)

    const gustoCoincide = !filtro.gusto || receta.gusto === filtro.gusto
    const categoriaCoincide =
      filtro.categorias.length === 0 ||
      filtro.categorias.some(cat => receta.categoria[cat])

    return (nombreCoincide || autorCoincide) && gustoCoincide && categoriaCoincide

  })

  return (
    
    <div className="p-4 space-y-6 bg-[#fff8f5] min-h-screen">


      {/* 🔘 Botón para abrir/cerrar filtros */}
      <button
        onClick={() => setMostrarFiltros(prev => !prev)}
        className="bg-[#93676b] text-white px-2 py-1 sm:px-4 sm:py-2 rounded hover:bg-[#7a5054] transition"
      >
        {mostrarFiltros ? <X/> : <Menu/>}
      </button>

      {/* 📦 Mostrar filtros si están activos */}
      {mostrarFiltros && (
        <FiltroBar filtro={filtro} setFiltro={setFiltro} />
      )}

      {/* 🧁 Lista de recetas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {recetasFiltradas.map(receta => (
          <RecetaCard key={receta.id} receta={receta} />
        ))}
      </div>

{toast && (
  <div className="fixed bottom-4 right-4 bg-[#604346] text-white px-4 py-2 rounded shadow z-50">
    {toast}
  </div>
)}
    </div>
  )
}

export default Recetas
