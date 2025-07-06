import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff8f5] text-[#604346] p-6">
      <div className="bg-[#f0c8bd] border border-[#a68983] rounded-xl shadow-md p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Bienvenido al Recetario</h1>
        <p className="mb-6 text-[#604346]">
          todas las recetas del fokin recetario de laura
        </p>
        <Link
          to="/recetas"
          className="inline-block bg-[#93676b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7a5054] transition"
        >
          Ver Recetas
        </Link>
      </div>
    </div>
  )
}

export default Home
