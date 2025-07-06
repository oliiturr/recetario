import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import RecetaCard from '../components/RecetaCard'
import FiltroBar from '../components/FiltroBar'

function Recetas() {
  const [recetas, setRecetas] = useState([])
  const [filtro, setFiltro] = useState({ gusto: '', categoria: '', buscar: '' })

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
    const nombreCoincide = receta.nombre.toLowerCase().includes(filtro.buscar.toLowerCase())
    const gustoCoincide = !filtro.gusto || receta.gusto === filtro.gusto
    const categoriaCoincide = !filtro.categoria || receta.categoria[filtro.categoria]

    return nombreCoincide && gustoCoincide && categoriaCoincide
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
  {recetasFiltradas.map(receta => (
    <RecetaCard key={receta.id} receta={receta} />
  ))}
</div>

  )
}

export default Recetas
