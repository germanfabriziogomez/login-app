const Layout = ({children}) => {
 return (
    <>
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/register">Registrarse</Link></li>
                    <li><Link to="/login">Iniciar sesion</Link></li>
                </ul>
            </nav>
        </header>
        <main>
            {children}
        </main>
        <footer>
            <p>&copy Todos los derechos reservados</p>
        </footer>
    </>
 )
}
export {Layout}
