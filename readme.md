# 🛡️ Login App con Node.js, Express, MongoDB y JWT

Este proyecto implementa un sistema de autenticación utilizando Node.js, Express, MongoDB y JSON Web Tokens (JWT). También incluye una API que permite la comunicación entre el backend y el frontend.

## 🚀 Características

- 🔐 Autenticación con JWT.
- 📦 Almacenamiento seguro de contraseñas con bcrypt.
- 🗄️ Base de datos MongoDB para gestionar usuarios.
- 🌍 API REST para el frontend.
- ⚡ Express como framework backend.

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/germanfabriziogomez/login.git
   ```
2. Accede al directorio del proyecto
```
cd login
```
3. - Instala las dependencias:
```
npm install
```
4. Configura las variables de entorno en un archivo .env del backend
```
>> cd backend 
MONGO_URI=tu_url_de_mongodb
JWT_SECRET=tu_secreto_jwt
PORT=3000
```
5. Inicia el servidor
```
>> cd backend 
npm run start
```
6. Utiliza la aplicacion usando el formulario del front end 
