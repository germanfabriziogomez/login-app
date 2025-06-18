import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [messageError, setMessageError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  const iniciar_sesion = async (userData) => {
    
    try {

      //leo la url segun en el modo de desarrollo en el que esté, ya sea de forma local o remota
      const url = import.meta.env.VITE_DEV_MODE === "development" ? "http://localhost:3000" : import.meta.env.VITE_APP_URL
      
      const response = await fetch(`${url}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!data.success) {
        setMessageError(data.message); // Mostrar mensaje de error
      } else {
        localStorage.setItem("token", data.token); // Guardar token si el login es exitoso
        setMessageError(""); // Limpiar mensaje de error
        navigate("/"); // Redirigir al Home
      }
    } catch (error) {
      setMessageError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    await iniciar_sesion(userData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 text-white p-10 rounded-lg shadow-lg w-full max-w-md relative">
        {/* 🔹 Botón de regreso al home */}
        <Link to="/" className="absolute top-4 left-4 bg-gray-700 px-4 py-2 rounded-md text-white hover:bg-gray-600 transition">
          ← 
        </Link>

        <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
        <form className="space-y-6 p-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {messageError && (
            <p className="text-red-500 text-center font-semibold">{messageError}</p>
          )}
          <Link to="/recover" className="mb-4 block">Olvidé mi contraseña</Link>
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-600 transition-all"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export { Login };