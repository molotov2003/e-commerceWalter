
const conexion=require("../modules/Conexion");
const bcrypt=require("bcrypt");
const cors = require("cors"); // para evitar restricciones entre llamadas de sitios
const multer=require("multer")
const express=require("express")
const secret = process.env.secret;
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const baseDeDatos=require("../modules/Conexion")
const Ruta=express.Router()




exports.insertarUsuario=(req,res)=>{
  const{nombre_cliente,email_cliente,direccion_cliente,password_cliente}=req.body;
    baseDeDatos.query("INSERT INTO clientes (nombre_cliente,email_cliente,direccion_cliente,password_cliente)VALUES (?,?,?,?)",[nombre_cliente,email_cliente,direccion_cliente,password_cliente],(err,results)=>{
      try {
        if (err) {
          res.status(500).json({
            error:false,
            mensaje:"Error en la consulta"
          })
        }
        else{
            res.status(200).json({success:true,message:"Usuario insertado correctamente",/* id:results.insertId */nombre_cliente,email_cliente,direccion_cliente,password_cliente}) 
        }
      } catch (error) {
        return res.status(400).send({
          error: error.message,
          mensaje:"error interno"
        });
      }
     
    
    })
    
  }
/* usuario.get("/usuarios/listar", (req, res) => {
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
}); */

  