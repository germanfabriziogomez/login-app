import { useState } from "react";

const FormVerifyToken = ({ setStep }) => {
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        try {
            
            //leo la url segun en el modo de desarrollo en el que esté, ya sea de forma local o remota
            const url = import.meta.env.VITE_DEV_MODE === "development" ? "http://localhost:3000" : import.meta.env.VITE_APP_URL
           
        
            const response = await fetch(`${url}/users/recover/update`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (!data.success) {
                setMessage(data.message);
                return;
            }

            setStep((prevStep) => prevStep + 1);
        } catch (error) {
            setMessage("❌ Error al verificar el token.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
            <div className="bg-gray-800 text-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">🔎 Verificar Token</h2>
                <form onSubmit={handleVerify}>
                    <input
                        type="text"
                        placeholder="Ingresa el token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {message && <p className="text-red-500 text-center mt-4">{message}</p>}
                    <button
                        type="submit"
                        className=" cursor-pointer w-full bg-green-500 text-white py-3 rounded font-semibold hover:bg-green-600 transition-all mt-4"
                    >
                        Verificar Token
                    </button>
                </form>
            </div>
        </div>
    );
};

export { FormVerifyToken };