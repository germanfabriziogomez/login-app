import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormVerifyToken } from "../reset_password/FormVerifyToken";
import { FormUpdatePassword } from "../reset_password/FormUpdatePassword";

const FormResetPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState("")
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (email === "") {
      setMessage("Ingresa un correo electronico")
      return;
    }
    try {
      const url = import.meta.env.VITE_DEV_MODE === "development" ? "http://localhost:3000" : import.meta.env.VITE_APP_URL
      const response = await fetch(`${url}/users/recover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();


      setMessage(data.message)
      if (data.success === true) {
        setStep((prev) => prev + 1)
      }

    } catch (error) {
      setMessage(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      {step === 1 && (<div className="bg-gray-800 text-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">🔑 Recuperar Contraseña</h2>
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
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {message && (<p className="text-red-500">{message}</p>)}
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-600 transition-all"

          >
            Enviar Token de Recuperación
          </button>
        </form>
      </div>)}
      {step === 2 && (<FormVerifyToken setStep={setStep} />)}
      {step === 3 && (<FormUpdatePassword setStep={setStep} />)}
    </div>
  );
};

export { FormResetPassword };