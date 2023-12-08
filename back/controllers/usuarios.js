
const conexion=require("../modules/Conexion");
const bcrypt=require("bcrypt");
const cors = require("cors"); // para evitar restricciones entre llamadas de sitios
const multer=require("multer")
const express=require("express")
const usuario = express.Router();
const secret = process.env.secret;
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

usuario.use(express.json()); //serializa la data en JSON
usuario.use(cors());
usuario.options("*", cors());


usuario.post("/usuarios/crear", async (req, res) => {
  try {
    const variables={
      nombre_cliente:req.body.nombre_cliente,
      email_cliente:req.body.email_cliente,
      direccion_cliente:req.body.direccion_cliente,
      password_cliente:bcrypt.hashSync(req.body.password_cliente, 7),
    
    };

    let consulta=conexion.query(
      "INSERT INTO clientes SET ?",
      variables,
      
      (error, respuesta) => {
        if (error) {
          res.status(505).json({
            mensaje: "error",
            respuesta: error,
          });
          
        } else {
          res.status(200).json({
            mensaje: "OK",
            respuesta: respuesta,
          });
        }
      }
    );
  } catch (error) {
    res.status(404).json({
      code: error.code,
      mensaje: error.message,
      mensaje2:"error de consulta"
    });
  }
});
usuario.get("/usuarios/listar", (req, res) => {
  try {
    conexion.query(
      "SELECT nombre_cliente FROM clientes",
      (error, respuesta) => {
        res.send(respuesta).json();
      }
    );
  } catch (error) {
    // throw error;
    res.status(404).json({
      code: error.code,
      mensaje: error.message,
    });
  }
});
  module.exports = usuario;
  