const productosControlador=require("../controllers/productos")
const auth = require("../controllers/auth");
const express = require("express");
const router = express.Router();
const app = express();
// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());



/* RUTAS DEL CONTROLADOR PRODUCTOS */
router.post("/insertarProducto",auth,productosControlador.insertarProductos)
router.put("/actualizarProducto/:producto_id",productosControlador.editarProductos)
router.delete("/eliminarProducto/:producto_id",auth,productosControlador.eliminarProductos)
router.get("/listarProductos",auth,productosControlador.traerProductos)
router.get("/listarporCategoria/:producto_id",auth,productosControlador.traerProductosfiltrado)

module.exports=router