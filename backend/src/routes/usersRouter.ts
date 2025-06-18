import { Router } from "express";
import { iniciarSesion, createUser, resetPassword, verifyToken, updatePassword } from "../controllers/UserController";

const usersRouter = Router();

// Iniciar sesión
usersRouter.post("/login", iniciarSesion);

// Crear usuario
usersRouter.post("/register", createUser);

// Recuperar contraseña (Envía el token un archivo)
usersRouter.post("/recover", resetPassword);

// Validar el token de recuperacion
usersRouter.post("/recover/update", verifyToken);

// Actualizar la contraseña si el token era valido
usersRouter.patch("/recover/update", updatePassword);

export { usersRouter };