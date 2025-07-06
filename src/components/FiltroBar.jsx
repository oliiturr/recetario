import { Link } from 'react-router-dom'

const gustos = ['dulce', 'salado']
const categorias = ['cookies', 'masas', 'merienda', 'postre', 'torta', 'tarta', 'pan', 'muffin']

function FiltroBar({ filtro, setFiltro }) {
  // 🔁 Toggle de gusto (uno solo)
  const toggleGusto = (g) => {
    setFiltro(prev => ({
      ...prev,
      gusto: prev.gusto === g ? '' : g,
    }))
  }

  // 🔁 Toggle de categorías (muchas)
  const toggleCategoria = (cat) => {
    setFiltro(prev => {
      const nuevasCategorias = prev.categorias.includes(cat)
        ? prev.categorias.filter(c => c !== cat)
        : [...prev.categorias, cat]

      return {
        ...prev,
        categorias: nuevasCategorias,
      }
    })
  }

  return (
    <div className="space-y-4 bg-[#fffcfa] p-4 rounded-lg shadow">

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filtro.buscar}
        onChange={e => setFiltro({ ...filtro, buscar: e.target.value })}
        className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-[#93676b]"
      />

      {/* Gusto */}
      <div>
        <p className="font-semibold text-[#93676b] mb-2">Gusto:</p>
        <div className="flex gap-2 flex-wrap">
          {gustos.map(g => (
            <button
              key={g}
              onClick={() => toggleGusto(g)}
              className={`px-3 py-1 rounded-full border transition ${
                filtro.gusto === g
                  ? 'bg-[#efa3a7] text-white border-[#efa3a7]'
                  : 'bg-[#fff8f8] text-gray-700 hover:bg-[#ffe7e9]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Categorías múltiples */}
      <div>
        <p className="font-semibold text-[#93676b] mb-2">Categorías:</p>
        <div className="flex gap-2 flex-wrap">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategoria(cat)}
              className={`px-3 py-1 rounded-full border transition ${
                filtro.categorias.includes(cat)
                  ? 'bg-[#ffbebf] text-white border-[#ffbebf]'
                  : 'bg-[#fff8f8] text-gray-700 hover:bg-[#ffe7e9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Botón de agregar receta */}
      <Link
        to="/agregar"
        className="inline-block bg-[#93676b] text-white px-4 py-2 rounded hover:bg-[#7a5054] transition"
      >
        + Nueva Receta
      </Link>
    </div>
  )
}

export default FiltroBar
