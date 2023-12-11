const bcrypt = require("bcrypt");
const multer = require("multer");
const nodemailer = require("nodemailer");
/* const secret = process.env.secret; */
const secret = "tu_clave_secreta"; // Reemplaza con tu clave secreta real
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const baseDeDatos = require("../modules/Conexion");
const jwtVerified = require("./jwtVerified");
const util = require("util"); //la trae por defecto node js me permite usar async/await opcion a fetch
const { json } = require("body-parser");
const baseDeDatosQuery = util.promisify(baseDeDatos.query).bind(baseDeDatos);
const dotenv = require('dotenv');
// Cargar variables de entorno desde el archivo .env
dotenv.config();

//Controlladores para usuarios
exports.insertarUsuario = async (req, res) => {
  const data = {
    nombre_cliente: req.body.nombre_cliente,
    email_cliente: req.body.email_cliente,
    direccion_cliente: req.body.direccion_cliente,
    password_cliente: bcrypt.hashSync(req.body.password_cliente, 7),
  };

  // Validar el correo electrónico antes de insertar un nuevo usuario
  const [rows] = await baseDeDatosQuery(
    "SELECT email_cliente FROM clientes WHERE email_cliente = ?",
    [data.email_cliente]
  );

  if (rows && rows.email_cliente !== undefined) {
    return res.status(400).json({ error: "Email ya está en uso" });
  }
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

//controlladores de editar usuarios
exports.editarUsuario = async (req, res) => {
  try {
    let id_cliente = req.params.id_cliente;
    const data = {
      nombre_cliente: req.body.nombre_cliente,
      email_cliente: req.body.email_cliente,
      direccion_cliente: req.body.direccion_cliente,
      password_cliente: bcrypt.hashSync(req.body.password_cliente, 7),
    };

    // Actualizar el usuario en la base de datos
    baseDeDatos.query(
      "UPDATE clientes SET nombre_cliente = ?, email_cliente = ?, direccion_cliente = ?, password_cliente = ? WHERE id_cliente = ?",
      [
        data.nombre_cliente,
        data.email_cliente,
        data.direccion_cliente,
        data.password_cliente,
        id_cliente,
      ],
      (err, result) => {
        try {
          if (err) {
            return res.status(500).json({
              mensaje: "Error en la consulta",
              error: true,
              detalles: err.message, // Agregar detalles del error
            });
          } else {
            // Verificar si se realizó la actualización correctamente
            if (result.affectedRows > 0) {
              return res.status(200).json({
                mensaje: "Actualizado correctamente",
                error: false,
              });
            } else {
              return res.status(404).json({
                mensaje: "Usuario no encontrado",
                error: true,
                mensaje2: result,
              });
            }
          }
        } catch (error) {
          return res.status(400).json({
            error: true,
            mensaje: "Error interno",
          });
        }
      }
    );
  } catch (error) {
    console.error("Error interno:", error.message);
    return res.status(500).json({
      error: true,
      mensaje: "Error interno del servidor",
    });
  }
};

//controlladores de eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    let idCliente = req.params.idCliente;

    baseDeDatos.query(
      "DELETE FROM clientes WHERE id_cliente = ?",
      [idCliente],
      (err, response) => {
        try {
          if (err) {
            return res.status(400).json({
              error: err,
              mensaje: "Error en la consulta",
            });
          } else {
            if (response.affectedRows > 0) {
              return res.status(200).json({
                mensaje: response,
                mensaje2: "Eliminado correctamente",
              });
            } else {
              return res.status(404).json({
                mensaje: "Usuario no encontrado",
                error: err.message,
              });
            }
          }
        } catch (error) {
          return res.status(400).json({
            error: error.mensaje,
            mensaje: "Error interno",
          });
        }
      }
    );
  } catch (error) {
    console.error("Error interno:", error.message);
    return res.status(500).json({
      error: true,
      mensaje: "Error interno del servidor",
    });
  }
};

//Hago la ruta para buscar si el email ya esta registrado en el sistema
exports.emailValidator = async (req, res) => {
  try {
    let data = {
      email_cliente: req.body.email_cliente,
    };

    // Validamos que lleguen los datos completos
    if (!data.email_cliente) {
      return res
        .status(400)
        .json({ response: false, error: "Debe enviar los datos completos" });
    }

    const [rows] = await baseDeDatosQuery(
      "SELECT email_cliente FROM clientes WHERE email_cliente = ?",
      [data.email_cliente]
    );

    if (rows && rows.email_cliente !== undefined) {
      return res
        .status(400)
        .json({ response: false, error: "Email ya está en uso" });
    } else {
      return res
        .status(201)
        .json({ response: true, message: "Email no está en uso" });
    }
  } catch (error) {
    console.error("Error en la consulta:", error);
    return res
      .status(500)
      .json({ response: false, error: "Error en la consulta" });
  }
};

//controlador para login de usuario
exports.loginUsuario = async (req, res) => {
  try {
    const email_cliente = req.body.email_cliente.trim();
    const password_cliente = req.body.password_cliente;

    // Validamos que lleguen los datos completos
    if (!email_cliente || !password_cliente) {
      return res.status(400).json({ error: 'Debe enviar los datos completos' });
    }

    baseDeDatos.query(
      'SELECT * FROM clientes WHERE email_cliente = ?',
      [email_cliente],
      async (error, respuesta) => {
        if (error) {
          console.error('Error en la consulta:', error);
          return res.status(500).json({ error: 'Error en la consulta' });
        }

        if (
          respuesta.length === 0 ||
          !(await bcrypt.compare(password_cliente, respuesta[0].password_cliente))
        ) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        } else {
          // Generar token utilizando la función del módulo jwtVerified
          const token = jwtVerified.generateToken(respuesta[0].id_cliente);

          // Enviar código por correo electrónico
          const codigoAcceso = generarCodigoAcceso();
          enviarCorreoElectronico(email_cliente, codigoAcceso);

          return res.status(200).json({
            token: token,
            message: 'Bienvenido, token generado. Se ha enviado un código por correo electrónico.',
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

function generarCodigoAcceso () {
  // Lógica para generar un código de acceso, por ejemplo, un número aleatorio
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function enviarCorreoElectronico(destinatario,codigoAcceso){
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
   /*  from: 'msmario1722@gmail.com', */
    to: destinatario,
    subject: 'Código de Acceso',
    text: `Ingresa este codigo de verificacion para iniciar sesion:${codigoAcceso}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
}
