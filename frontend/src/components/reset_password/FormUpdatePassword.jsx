import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const FormUpdatePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [success,setSuccess] = useState(false)
    const navigate = useNavigate();
    
    const handleUpdate = async (e) => {
        e.preventDefault(); // Evita recargar la página

        try {
            const response = await fetch("http://localhost:3000/users/recover/update", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();
            setSuccess(data.success)
            setMessage(data.message + "\n Redirigiendo al home.....")
            //regreso al home despues de 3 segundos
            setTimeout(()=>{
                navigate("/");
            },3000)
        } catch (error) {
            setMessage("❌ Error al actualizar la contraseña.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
            
            <div className="bg-gray-800 text-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">🔒 Actualizar Contraseña</h2>
                <form className="space-y-6 p-5" onSubmit={handleUpdate}>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
                            className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    {message && <p className={success?"text-green-500":"text-red-500"}>{message}</p>}
                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-600 transition-all"
                    >
                        Guardar Contraseña
                    </button>
                </form>
            </div>
        </div>
    );
};

export { FormUpdatePassword };