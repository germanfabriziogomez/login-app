import mongoose from "mongoose";
import dotenv from 'dotenv'

//leo las variables de entorno
dotenv.config();

const PORT = process.env.PORT! 
const URI_DB= process.env.DEV_MODE==="production"?process.env.URI_DB:"mongodb://localhost:27017/Clase_25"

const connectDB = async () => {
    try {
        if(URI_DB)
        {
            await mongoose.connect(URI_DB);
            console.log("Conectado a mongoose correctamente")
        }
        else
        {
            console.log("Error al crear la conexion.....")
            throw new Error("La variable de entorno es requerida")
        }
    } catch (error) {
        const err = error as Error
        console.log("Error al conectarse a mongoose", err.message);
    }
}

export {connectDB, PORT}