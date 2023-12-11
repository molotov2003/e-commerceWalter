const bcrypt = require("bcrypt");
const multer = require("multer");
/* const secret = process.env.secret; */
const secret = "tu_clave_secreta"; // Reemplaza con tu clave secreta real
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //la trae por defecto node js me permite usar async/await opcion a fetch
const baseDeDatos = require("../modules/Conexion");
const jwtVerified = require("./jwtVerified");

//Controlladores para usuarios
exports.insertarUsuario = (req, res) => {
  const data = {
    nombre_cliente: req.body.nombre_cliente,
    email_cliente: req.body.email_cliente,
    direccion_cliente: req.body.direccion_cliente,
    password_cliente: bcrypt.hashSync(req.body.password_cliente, 7),
  };

  baseDeDatos.query(
    "INSERT INTO clientes (nombre_cliente, email_cliente, direccion_cliente, password_cliente) VALUES (?, ?, ?, ?)",
    [
      data.nombre_cliente,
      data.email_cliente,
      data.direccion_cliente,
      data.password_cliente,
    ],
    (err, results) => {
      try {
        if (err) {
          /* console.error('Error en la consulta:', err); */
          return res.status(500).json({
            error: false,
            mensaje: "Error en la consulta",
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "Usuario insertado correctamente",
            id: results.insertId, // Agregué el ID del usuario insertado
            nombre_cliente: data.nombre_cliente,
            email_cliente: data.email_cliente,
            direccion_cliente: data.direccion_cliente,
          });
        }
      } catch (error) {
       /*  console.error("Error interno:", error.message); */
        return res.status(400).json({
          error: true,
          mensaje: "Error interno",
        });
      }
    }
  );
};

exports.loginUsuario = async (req, res) => {
  try {
    const email_cliente = req.body.email_cliente.trim();
    const password_cliente = req.body.password_cliente;

    // Validamos que lleguen los datos completos
    if (!email_cliente || !password_cliente) {
      return res.status(400).json({ error: "Debe enviar los datos completos" });
    }

    baseDeDatos.query(
      "SELECT * FROM clientes WHERE email_cliente = ?",
      [email_cliente],
      async (error, respuesta) => {
        if (error) {
          console.error("Error en la consulta:", error);
          return res.status(500).json({ error: "Error en la consulta" });
        }

        if (
          respuesta.length === 0 ||
          !(await bcrypt.compare(
            password_cliente,
            respuesta[0].password_cliente
          ))
        ) {
          return res.status(401).json({ error: "Credenciales inválidas" });
        } else {

          // Generar token utilizando la función del módulo jwtVerified
          /* Este ID se utiliza como el "payload" del token JWT. El "payload" es la parte del token que contiene la información útil y que se decodifica al leer el token, pero que no es secreta.*/
          const token = jwtVerified.generateToken(respuesta[0].id_cliente);

          return res.json({
            token: token,
            message: "Bienvenido,token generado!!",
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
