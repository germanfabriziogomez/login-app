import { connectDB, PORT } from "./config/mongo";
import express from 'express'
import { usersRouter } from "./routes/usersRouter"
import cors from "cors"
import dotenv from "dotenv";


dotenv.config();
//Creo el server
const server = express();

//permito que el front me envie datos tipo json en el body
server.use(express.json());

//permito que hagan fetch desde otro puerto (desde el front end)
server.use(cors())

//asigno routes para cada endpoint
server.use("/users", usersRouter)

//pongo al server en escucha
server.listen(PORT, () => {
    connectDB();
    console.log("Aplicacion escuchando en el puerto", PORT);
})



