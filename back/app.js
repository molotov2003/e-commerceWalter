// pruerta de entrada de la app  ::: PRINCIPIO SPR SINGLE RESPONSABILITY
const express = require("express");
const app = express(); //creamos nuestra aplicacion llamando el metodo constructor de express
require("dotenv/config");

app.use("/", require("./controllers/usuarios")); //redirigimos al modulo PRODUCTO

app.listen("3900", () => {
  console.log("Aplicacion ejecutandose en : http://localhost:3900");
});

