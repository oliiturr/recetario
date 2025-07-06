function RecetaCard({ receta }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{receta.nombre}</h2>
      <p className="text-sm text-gray-600 mb-1">Gusto: <span className="capitalize">{receta.gusto}</span></p>
      <p className="text-sm text-gray-600 mb-1">
        Categorías:{" "}
        {Object.keys(receta.categoria)
          .filter(k => receta.categoria[k])
          .join(', ')}
      </p>
      <p className="text-sm text-gray-600">Página: {receta.pagina}</p>
    </div>
  )
}

export default RecetaCard
