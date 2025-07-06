// import { Link } from 'react-router-dom'

// function Home() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff8f5] text-[#604346] p-6">
//       <div className="bg-[#f0c8bd] border border-[#a68983] rounded-xl shadow-md p-8 text-center max-w-md w-full">
//         <h1 className="text-3xl font-bold mb-4">Bienvenido al Recetario</h1>
//           <p className="mb-6 text-[#604346]">
//             todas las recetas del fokin recetario de laura
//           </p>
//         <button
//           onClick={handleAcceso}
//           className="inline-block bg-[#93676b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7a5054] transition"
//         >
//           Ver Recetas
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Home


import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CLAVE_CORRECTA = 'lasfokinrecetas'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const claveGuardada = localStorage.getItem('acceso_recetario')
    if (claveGuardada === CLAVE_CORRECTA) {
      navigate('/recetas')
    }
  }, [navigate])

  const handleAcceso = () => {
    const clave = prompt('Ingresá la contraseña para acceder al recetario:')
    if (clave === CLAVE_CORRECTA) {
      localStorage.setItem('acceso_recetario', CLAVE_CORRECTA)
      navigate('/recetas')
    } else {
      alert('Contraseña incorrecta ❌')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff8f5] text-[#604346] p-6">
      <div className="bg-[#f0c8bd] border border-[#a68983] rounded-xl shadow-md p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Bienvenido al Recetario</h1>
          <p className="mb-6 text-[#604346]">
            todas las recetas del fokin recetario de laura
          </p>
        <button
          onClick={handleAcceso}
          className="inline-block bg-[#93676b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7a5054] transition"
        >
          Ver Recetas
        </button>
      </div>
    </div>
  )
}

export default Home

