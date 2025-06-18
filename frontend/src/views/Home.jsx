import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center w-full max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido a nuestra comunidad</h1>
        <p className="text-gray-600 mb-6">Regístrate ahora</p>
        <button className="my-10 cursor-pointer w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition-all" onClick={() => navigate("/register")}>
          Regístrate Gratis          
        </button>
        <button className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition-all" onClick={() => navigate("/login")}>
          Iniciar sesion          
        </button>
      </div>
    </div>
  );
};

export {Home};