// pruerta de entrada de la app  ::: PRINCIPIO SPR SINGLE RESPONSABILITY
const express = require("express");
const app = express(); //creamos nuestra aplicacion llamando el metodo constructor de express
const usuariosRoutes=require("./Routes/Usuarios")
const productosRoutes=require("./Routes/Productos")
const categoriaRoutes=require("./Routes/categorias")
const metodosPago=require("./Routes/metodosPago")
const encabezadoRoutes=require("./Routes/encabezado")
const bodyParser=require("body-parser")
const path =require("path")
const cors = require('cors'); // Importa el middleware cors
const dotenv = require('dotenv');
dotenv.config();


app.use(express.urlencoded({ extended: true }));

// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());

//Middleware para manejar datos JSON
app.use(bodyParser.json())

// Middleware CORS
app.use(cors());
//para poder  traer las imagenes
app.use(express.static(path.join(__dirname, "images")));

//Ruta Usuarios
app.use("/users",usuariosRoutes)

//Ruta Productos
app.use("/products",productosRoutes)

//ruta categorias
app.use("/categorias",categoriaRoutes)

//ruta metodosDePago
app.use("/metodosPago",metodosPago)

//ruta encabezado

app.use("/encabezado",encabezadoRoutes)


app.listen("3900", () => {
  console.log("Aplicacion ejecutandose en : http://localhost:3900");
});

