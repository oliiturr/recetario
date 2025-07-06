const gustos = ['dulce', 'salado']
const categorias = ['cookies', 'masas', 'merienda', 'postre', 'torta', 'tarta', 'pan', 'muffin']

function FiltroBar({ filtro, setFiltro }) {
  const toggle = (tipo, valor) => {
    setFiltro(prev => ({
      ...prev,
      [tipo]: prev[tipo] === valor ? '' : valor,
    }))
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filtro.buscar}
        onChange={e => setFiltro({ ...filtro, buscar: e.target.value })}
        className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />

      <div>
        <p className="font-semibold mb-2">Gusto:</p>
        <div className="flex gap-2 flex-wrap">
          {gustos.map(g => (
            <button
              key={g}
              onClick={() => toggle('gusto', g)}
              className={`px-3 py-1 rounded-full border transition ${
                filtro.gusto === g
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Categoría:</p>
        <div className="flex gap-2 flex-wrap">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => toggle('categoria', cat)}
              className={`px-3 py-1 rounded-full border transition ${
                filtro.categoria === cat
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FiltroBar
