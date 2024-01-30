const encabezadoControlador=require("../controllers/encabezado")
const auth = require("../controllers/auth");
const express = require("express");
const router = express.Router();
const app = express();
// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());



/* RUTAS DEL CONTROLADOR ENCABEZADO */

/* router.post("/insertarCategoria",auth,encabezadoControlador.insertarCagetorias)
router.put("/actualizarCategoria/:categoria_id",auth,encabezadoControlador.editarCategorias)
router.delete("/eliminarCategoria/:categoria_id",auth,encabezadoControlador.eliminarCategorias) */
router.get("/listarEncabezado",auth,encabezadoControlador.listarEncabezados)
router.get("/listarEncabezadoUsuario/:idUsuario",auth,encabezadoControlador.listarEncabezadosUsuario)
router.post("/EnviarCorreoFactura",auth,encabezadoControlador.enviarCorreoFactura)
router.post("/AgregarEncabezado",auth,encabezadoControlador.insertarEncabezado)
module.exports=router