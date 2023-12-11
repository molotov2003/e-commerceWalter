// router de perfil
const express = require("express");
const router = express.Router();
const multer = require("multer");
const usuarioControlador = require("../controllers/usuarios");
const auth = require("../controllers/auth");

//configuracion de subidad de archivos

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/avatars/");
  },
  filename: (req, file, cb) => {
    cb(null, "avatar-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

/* RUTAS DEL CONTROLADOR USUARIO */
router.post("/insertar",usuarioControlador.insertarUsuario)
router.post("/login",usuarioControlador.loginUsuario)
module.exports = router;