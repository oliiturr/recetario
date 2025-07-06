import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RecetaCard({ receta }) {
  const [mostrarModal, setMostrarModal] = useState(false)
  const categoriasActivas = Object.entries(receta.categoria || {})
    .filter(([, valor]) => valor)
    .map(([nombre]) => nombre)

  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col h-full bg-[#f0c8bd] shadow-md rounded-xl p-2 sm:p-4 border border-[#a68983] hover:shadow-lg transition space-y-2">
        <h2 className="text-md sm:text-xl font-bold text-[#604346]">{receta.nombre}</h2>

        {receta.gusto && (
          <p className="text-sm text-[#604346]">
            Gusto: <span className="capitalize font-semibold">{receta.gusto}</span>
          </p>
        )}

        {categoriasActivas.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categoriasActivas.map(cat => (
              <span
                key={cat}
                className="px-2 py-1 text-xs bg-[#a68983] text-white rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {receta.autor && (
          <p className="text-sm text-[#604346]">
            Autor: <span className="font-semibold">{receta.autor}</span>
          </p>
        )}

        <p className="text-sm text-[#604346]">
          Página: <span className="font-semibold">{receta.pagina}</span>
        </p>

        {/* Botones */}
        <div className="mt-auto pt-4 flex justify-between gap-1 sm:gap-2">
          <button
            onClick={() => setMostrarModal(true)}
            className="flex-1 text-xs sm:text-sm px-1 py-1 sm:px-3 sm:py-1 bg-[#93676b] text-white rounded hover:bg-[#7a5054] transition"
          >
            Ver receta
          </button>

          <button
            onClick={() => navigate(`/editar/${receta.id}`)}
            className="flex-1 text-xs sm:text-sm px-1 py-1 sm:px-3 sm:py-1 bg-[#a68983] text-white  rounded hover:bg-[#8b6c64] transition"
          >
            Editar
          </button>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative space-y-4">
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-[#604346]">{receta.nombre}</h2>

            {receta.ingredientes && (
              <div>
                <h3 className="font-semibold text-[#93676b] mb-1">Ingredientes:</h3>
                <ul className="list-disc list-inside text-sm text-[#604346] whitespace-pre-line">
                  {receta.ingredientes.split('\n').map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}

            {receta.indicaciones && (
              <div>
                <h3 className="font-semibold text-[#93676b] mt-4 mb-1">Indicaciones:</h3>
                <p className="text-sm text-[#604346] whitespace-pre-line">
                  {receta.indicaciones}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default RecetaCard
