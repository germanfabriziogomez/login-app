import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [success, setSuccess] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [messageRegister, setMessageRegister] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const navigate = useNavigate();

  const registrar_usuario = async (userData) => {
    try {
      //leo la variable de entorno que me indica el modo en el que estoy
      const dev_mode = process.env.DEV_MODE 

      //leo la url segun en el modo de desarrollo en el que esté, ya sea de forma local o remota
      const url = dev_mode==="development"?"http://localhost:3000":process.env.REACT_APP_URL
      
      const response = await fetch(url+"/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!data.success) {
        setMessageRegister("Ya existe un usuario registrado con ese email");
        setSuccess(false);
      } else {
        setMessageRegister("Usuario creado correctamente");
        setSuccess(true);
        setTimeout(() => {
          navigate("/"); // Redirigir al Home 5 segundos después
        }, 5000);
      }
      
    } catch (error) {
      setMessageRegister("Error en la conexión con el servidor.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, lastname: surname, email, password };
    await registrar_usuario(userData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 text-white p-10 rounded-lg shadow-lg w-full max-w-md relative">
        {/* 🔹 Botón de regreso con flecha */}
        <Link to="/" className="absolute top-4 left-4 bg-gray-700 px-4 py-2 rounded-md text-white hover:bg-gray-600 transition">
          ← 
        </Link>

        <h2 className="text-3xl font-bold text-center mb-6">Crea tu cuenta</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="surname">
              Apellido
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Apellido"
              onChange={(e) => setSurname(e.target.value)}
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {!success && <p className="text-red-500">{messageRegister}</p>}
          {success && <p className="text-green-500">{messageRegister}</p>}
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition-all"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export { Register };