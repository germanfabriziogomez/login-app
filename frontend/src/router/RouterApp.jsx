import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Home} from "../views/Home.jsx"
import {Login} from "../views/Login.jsx"
import {Register} from "../views/Register.jsx"
import { FormResetPassword } from "../components/reset_password/FormResetPassword.jsx"

const RouterApp = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/recover" element={<FormResetPassword />} /> 
                <Route path="*" element={<h2>No se encuentra la pagina</h2>} />
            </Routes>
        </BrowserRouter>
    )
}
export { RouterApp }