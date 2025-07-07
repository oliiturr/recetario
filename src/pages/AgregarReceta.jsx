import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const categoriasDisponibles = ['cookies', 'masas', 'merienda', 'postre', 'torta', 'tarta', 'pan', 'muffin']

function AgregarReceta() {
  const [nombre, setNombre] = useState('')
  const [autor, setAutor] = useState('')
  const [gusto, setGusto] = useState('')
  const [pagina, setPagina] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [indicaciones, setIndicaciones] = useState('')
  const [categorias, setCategorias] = useState({})
  const navigate = useNavigate()

  const toggleCategoria = (cat) => {
    setCategorias(prev => ({
      ...prev,
      [cat]: !prev[cat],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!nombre || !gusto) {
      alert('Completá todos los campos obligatorios')
      return
    }

    const nuevaReceta = {
      nombre,
      autor,
      gusto,
      pagina: parseInt(pagina),
      categoria: categorias,
      ingredientes,
      indicaciones,
    }

    try {
  await addDoc(collection(db, 'recetas'), nuevaReceta)
  navigate('/recetas', {
    state: { mensaje: 'Receta agregada con éxito ✅' },
  })
} catch (err) {
  console.error('Error al agregar receta:', err)
}

  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#fff8f5] rounded-lg shadow-md space-y-6 border border-[#a68983]">
      <h1 className="text-3xl font-bold text-[#604346]">Agregar Receta</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Nombre de la receta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-3 border border-[#a68983] rounded-md text-[#604346] placeholder-[#a68983] focus:outline-none focus:ring-2 focus:ring-[#93676b]"
        />

        <input
          type="text"
          placeholder="Autor de la receta"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          className="w-full p-3 border border-[#a68983] rounded-md text-[#604346] placeholder-[#a68983] focus:outline-none focus:ring-2 focus:ring-[#93676b]"
        />

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-[#604346] font-semibold">
            <input
              type="radio"
              name="gusto"
              value="dulce"
              checked={gusto === 'dulce'}
              onChange={(e) => setGusto(e.target.value)}
              className="accent-[#93676b]"
            />
            Dulce
          </label>
          <label className="flex items-center gap-2 text-[#604346] font-semibold">
            <input
              type="radio"
              name="gusto"
              value="salado"
              checked={gusto === 'salado'}
              onChange={(e) => setGusto(e.target.value)}
              className="accent-[#93676b]"
            />
            Salado
          </label>
        </div>

        <div>
          <p className="font-semibold mb-2 text-[#604346]">Categorías:</p>
          <div className="flex flex-wrap gap-3">
            {categoriasDisponibles.map(cat => (
              <label
                key={cat}
                className={`flex items-center gap-2 px-3 py-1 rounded-full border cursor-pointer select-none
                  ${categorias[cat]
                    ? 'bg-[#ffbebf] border-[#ffbebf] text-white'
                    : 'bg-[#fff8f8] border-[#a68983] text-[#604346] hover:bg-[#ffd9dc]'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={!!categorias[cat]}
                  onChange={() => toggleCategoria(cat)}
                  className="hidden"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <input
          type="number"
          placeholder="Número de página"
          value={pagina}
          onChange={(e) => setPagina(e.target.value)}
          className="w-full p-3 border border-[#a68983] rounded-md text-[#604346] placeholder-[#a68983] focus:outline-none focus:ring-2 focus:ring-[#93676b]"
        />

        <textarea
          placeholder="Ingredientes (uno por línea)"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
          className="w-full h-28 p-3 border border-[#a68983] rounded-md text-[#604346] placeholder-[#a68983] resize-none focus:outline-none focus:ring-2 focus:ring-[#93676b]"
        />

        <textarea
          placeholder="Indicaciones de preparación"
          value={indicaciones}
          onChange={(e) => setIndicaciones(e.target.value)}
          className="w-full h-32 p-3 border border-[#a68983] rounded-md text-[#604346] placeholder-[#a68983] resize-none focus:outline-none focus:ring-2 focus:ring-[#93676b]"
        />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/recetas')}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#93676b] hover:bg-[#7a5054] text-white font-semibold px-4 py-2 rounded transition"
          >
            Guardar Receta
          </button>
        </div>
      </form>
    </div>
  )
}

export default AgregarReceta
