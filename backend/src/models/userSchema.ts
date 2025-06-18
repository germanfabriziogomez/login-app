import {Schema, model} from "mongoose"
import { iUserSchema } from "../interfaces/iUserSchema"

//creo el esquema que deben seguir los documentos de la base de datos
const userSchema = new Schema<iUserSchema>({
    name: {type:String,required:true},
    lastname: {type:String,required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    recoveryToken:{type:String, required:false},
    

},{ versionKey: false })

//creo el constructor
const User = model("users",userSchema)

export {User}