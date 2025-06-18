import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/userSchema";
import jwt from "jsonwebtoken";
import fs from "fs";

const iniciarSesion = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        //si no lo encontro...
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(404).json({success:false, message: "No existe un usuario registrado con ese email"});
        }

        //si SI lo encontró, verifico si la contraseña encriptada coincide con la contraseña que ingreso el usuario
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            return res.status(200).json({ success: true, name: foundUser.name, lastname: foundUser.lastname });
        } else {
            return res.status(400).json({ success: false, message: "Usuario y/o contraseña incorrectos." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
};

const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, lastname, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ name, lastname, email, password: passwordHash });
        //guardo en la base de datos
        await newUser.save();
        return res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error al crear el usuario" });
    }
};

// aca el usuario ingresa su mail, y esto le tiene que enviar un token de recuperacion (en el endpoint /recover)
const resetPassword = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email } = req.body;
        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(404).json({ success: false, message: "No existe usuario con ese email" });
        }
        //si existe el usuario con ese email, genero un token de recuperacion que expira en 5 minutos
        const JWT_SECRET = process.env.JWT_SECRET!;
        const token = jwt.sign({ id: foundUser._id }, JWT_SECRET, { expiresIn: "5m" });

        //guardo el email y el token de recuperacion en un archivo
        fs.writeFileSync("recovery_requests.txt", `email=${email}\ntoken=${token}`, "utf-8");
        console.log("Token generado:", token);

        //se guardará en el archivo "tokens.txt" en vez de enviarlo a un correo
        return res.status(200).json({ success: true, message: "Se envió un código de recuperación a tu correo" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error al generar el token de recuperación" });
    }
};

//esto se va a ejecutar antes de ejecutar el endpoint /recover/update
const verifyToken = async (req: Request, res: Response): Promise<any> => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET!;
        const token = req.body.token;
        jwt.verify(token, JWT_SECRET);
        return res.status(200).json({success:true}) //esto era! me faltaba esto!

    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(401).json({ success: false, message: "❌ Token inválido o expirado" });
    }
};

const updatePassword = async (req: Request, res: Response): Promise<any> => {
    try {
        const { newPassword } = req.body;

        // 🔥 Lee el archivo y extrae el email correctamente
        const data = fs.readFileSync("recovery_requests.txt", "utf-8").split("\n");
        const emailLine = data.find(line => line.startsWith("email="));
        const email = emailLine ? emailLine.split("=")[1] : null;

        if (!email) {
            return res.status(400).json({ success: false, message: "❌ No se encontró un email en el archivo." });
        }

        // 🔥 Hash de la nueva contraseña
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: passwordHash });

        return res.status(200).json({ success: true, message: "✅ Contraseña actualizada correctamente." });
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        return res.status(500).json({ success: false, message: "❌ Error al actualizar la contraseña." });
    }
};

export { iniciarSesion, createUser, resetPassword, verifyToken, updatePassword };
