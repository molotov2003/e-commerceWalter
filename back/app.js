// pruerta de entrada de la app  ::: PRINCIPIO SPR SINGLE RESPONSABILITY
const express = require("express");
const app = express(); //creamos nuestra aplicacion llamando el metodo constructor de express
const usuariosRoutes=require("./Routes/Usuarios")
const bodyParser=require("body-parser")
const cors = require('cors'); // Importa el middleware cors
/* require("dotenv/config"); */



//Middleware para manejar datos JSON
app.use(bodyParser.json())

// Middleware CORS
app.use(cors());

//Ruta Usuarios
app.use("/users",usuariosRoutes)

app.listen("3900", () => {
  console.log("Aplicacion ejecutandose en : http://localhost:3900");
});

