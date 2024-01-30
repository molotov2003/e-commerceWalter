const metodosPagoControlador=require("../controllers/metodosPago")
const auth = require("../controllers/auth");
const express = require("express");
const router = express.Router();
const app = express();
// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());



/* RUTAS DEL CONTROLADOR PRODUCTOS */

router.post("/insertarMetodoPago",auth,metodosPagoControlador.insertarMetodoPago)
router.put("/actualizarMetodoPago/:idMetodo",auth,metodosPagoControlador.editarMetodosPago)
router.delete("/eliminarMetodoPago/:idMetodo",auth,metodosPagoControlador.eliminarMetodoDePago)
router.get("/listarMetodoPago",auth,metodosPagoControlador.traerMetodosDePago)
module.exports=router