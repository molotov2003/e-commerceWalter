// router de perfil
const express = require("express");
const router = express.Router();
const multer = require("multer");
const app = express();
const usuarioControlador = require("../controllers/usuarios");
const auth = require("../controllers/auth");

// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());

/* RUTAS DEL CONTROLADOR USUARIO */
router.post("/insertar",usuarioControlador.insertarUsuario)
router.post("/login",usuarioControlador.loginUsuario)
router.post("/emailValidator",usuarioControlador.emailValidator)
router.put("/editarUsuario/:id_cliente",auth,usuarioControlador.editarUsuario)
router.delete("/eliminarUsuario/:idCliente",auth,usuarioControlador.eliminarUsuario)
router.get("/listarUsuarios",usuarioControlador.traerUsuarios)
module.exports = router;