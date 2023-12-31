// pruerta de entrada de la app  ::: PRINCIPIO SPR SINGLE RESPONSABILITY
const express = require("express");
const app = express(); //creamos nuestra aplicacion llamando el metodo constructor de express
const usuariosRoutes=require("./Routes/Usuarios")
const productosRoutes=require("./Routes/Productos")
const categoriaRoutes=require("./Routes/categorias")
const bodyParser=require("body-parser")
const cors = require('cors'); // Importa el middleware cors
const dotenv = require('dotenv');
dotenv.config();




// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());

//Middleware para manejar datos JSON
app.use(bodyParser.json())

// Middleware CORS
app.use(cors());

//Ruta Usuarios
app.use("/users",usuariosRoutes)

//Ruta Productos
app.use("/products",productosRoutes)

//ruta categorias
app.use("/categorias",categoriaRoutes)


app.listen("3900", () => {
  console.log("Aplicacion ejecutandose en : http://localhost:3900");
});

