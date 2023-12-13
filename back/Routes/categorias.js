const categoriasControlador=require("../controllers/categorias")
const auth = require("../controllers/auth");
const express = require("express");
const router = express.Router();
const app = express();
// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());



/* RUTAS DEL CONTROLADOR PRODUCTOS */
router.post("/insertarCategoria",categoriasControlador.insertarCagetorias)
router.put("/actualizarCategoria/:categoria_id",categoriasControlador.editarCategorias)
/* router.delete("/eliminarProducto/:producto_id",categoriasControlador.eliminarProduct)
router.get("/listarProductos",productosControlador.traerProductos) */
module.exports=router