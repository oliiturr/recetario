import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const categoriasDisponibles = ['cookies', 'masas', 'merienda', 'postre', 'torta', 'tarta', 'pan', 'muffin', 'pasta']

function EditarReceta() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [receta, setReceta] = useState(null)
  const [mensaje, setMensaje] = useState('') // ✅ mensaje de confirmación

  useEffect(() => {
    const cargarReceta = async () => {
      const docRef = doc(db, 'recetas', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setReceta({ id: docSnap.id, ...docSnap.data() })
      }
    }
    cargarReceta()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setReceta(prev => ({ ...prev, [name]: value }))
  }

  const toggleCategoria = (cat) => {
    setReceta(prev => ({
      ...prev,
      categoria: {
        ...prev.categoria,
        [cat]: !prev.categoria?.[cat],
      },
    }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const docRef = doc(db, 'recetas', receta.id)
    await updateDoc(docRef, receta)
    navigate('/recetas', {
      state: { mensaje: 'Receta actualizada con éxito ✅' },
    })
  } catch (err) {
    console.error('Error al actualizar receta:', err)
    alert('Ocurrió un error al guardar los cambios.')
  }
}

  const handleEliminar = async () => {
  if (confirm('¿Estás seguro de que querés eliminar esta receta?')) {
    try {
      await deleteDoc(doc(db, 'recetas', receta.id))
      navigate('/recetas', {
        state: { mensaje: 'Receta eliminada con éxito 🗑️' },
      })
    } catch (err) {
      console.error('Error al eliminar receta:', err)
    }
  }
}


  if (!receta) return <p className="text-center mt-10 text-[#604346]">Cargando receta...</p>

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#fff8f5] rounded-lg shadow space-y-6 border border-[#a68983]">
      <h1 className="text-3xl font-bold text-[#604346]">Editar Receta</h1>

      {mensaje && <div className="p-2 bg-green-100 text-green-800 border border-green-300 rounded">{mensaje}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" value={receta.nombre} onChange={handleChange} placeholder="Nombre" className="w-full p-3 border border-[#a68983] rounded-md" />
        <input name="autor" value={receta.autor || ''} onChange={handleChange} placeholder="Autor" className="w-full p-3 border border-[#a68983] rounded-md" />
        <input name="pagina" type="number" value={receta.pagina} onChange={handleChange} placeholder="Página" className="w-full p-3 border border-[#a68983] rounded-md" />

        <textarea name="ingredientes" value={receta.ingredientes || ''} onChange={handleChange} placeholder="Ingredientes" className="w-full p-3 border border-[#a68983] rounded-md" rows={3} />
        <textarea name="indicaciones" value={receta.indicaciones || ''} onChange={handleChange} placeholder="Indicaciones" className="w-full p-3 border border-[#a68983] rounded-md" rows={3} />

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-[#604346] font-semibold">
            <input type="radio" name="gusto" value="dulce" checked={receta.gusto === 'dulce'} onChange={handleChange} className="accent-[#93676b]" />
            Dulce
          </label>
          <label className="flex items-center gap-2 text-[#604346] font-semibold">
            <input type="radio" name="gusto" value="salado" checked={receta.gusto === 'salado'} onChange={handleChange} className="accent-[#93676b]" />
            Salado
          </label>
        </div>

        <div>
          <p className="font-semibold text-[#604346]">Categorías:</p>
          <div className="flex flex-wrap gap-2">
            {categoriasDisponibles.map(cat => (
              <label key={cat} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!receta.categoria?.[cat]}
                  onChange={() => toggleCategoria(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 bg-[#93676b] hover:bg-[#7a5054] text-white py-2 px-4 rounded"
            
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={handleEliminar}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Eliminar Receta
          </button>
          <button
            type="button"
            onClick={() => navigate('/recetas')}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditarReceta
