const bcrypt = require("bcrypt");
/* const secret = process.env.secret; */
const secret = "tu_clave_secreta"; // Reemplaza con tu clave secreta real
const jwt = require("jsonwebtoken");
const baseDeDatos = require("../modules/Conexion");
const jwtVerified = require("./jwtVerified");
const util = require("util"); //la trae por defecto node js me permite usar async/await opcion a fetch
const { json } = require("body-parser");
const baseDeDatosQuery = util.promisify(baseDeDatos.query).bind(baseDeDatos);
const dotenv = require('dotenv');
const enviarCorreoElectronico=require("../functions/EnviarCorreo")
const generarCodigoAcceso=require("../functions/generarCodigoAcceso")
// Cargar variables de entorno desde el archivo .env
dotenv.config();

//Controlladores para usuarios
/**
 * Funcion insertar usuarios
 * @author Mario Miranda
 * @copyright 14/12/2023
 * @param {require} req -datos solicitados para poder ejecutar la funcion, en este caso se necesita el id de la categoria 
 * @param {Response} res -los datos que se devolveran al cliente
 * @returns {boolean} -true  y un mensaje de confirmacion en caso de error le muestra el mensaje detallado
 */
exports.insertarUsuario = async (req, res) => {
  const data = {
    id_cliente: req.body.id_cliente,
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

  // Modificar la inserción del usuario para usar la consulta parametrizada
  const sql =
    "INSERT INTO clientes (id_cliente, nombre_cliente, email_cliente, direccion_cliente, password_cliente) VALUES (?, ?, ?, ?, ?)";

  baseDeDatos.query(
    sql,
    [
      data.id_cliente,
      data.nombre_cliente,
      data.email_cliente,
      data.direccion_cliente,
      data.password_cliente,
    ],
    (err, results) => {
      try {
        if (err) {
          console.error("Error en la consulta:", err);
          return res.status(500).json({
            error: true,
            mensaje: "Error en la consulta",
            errorDetails: err.message,
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "Usuario insertado correctamente",
          });
        }
      } catch (error) {
        console.error("Error interno:", error.message);
        return res.status(400).json({
          error: true,
          mensaje: "Error interno",
          errorDetails: error.message,
        });
      }
    }
  );
};

//controlladores de editar usuarios
/**
 * Funcion insertar categorias
 * @author Mario Miranda
 * @copyright 14/12/2023
 * @param {require} req -datos solicitados para poder ejecutar la funcion, en este caso se necesita el id del cliente
 * @param {Response} res -los datos que se devolveran al cliente
 * @returns {boolean} -le muestra un detalle en true y un mensaje de confirmacion
 */
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
                detalles: true,
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
/**
 * Funcion eliminar usuario
 * @author Mario Miranda
 * @copyright 14/12/2023
 * @param {require} req -datos solicitados para poder ejecutar la funcion, en este caso se necesita el id del usuario 
 * @param {Response} res -los datos que se devolveran al cliente
 * @returns {boolean} -la respuesta, y un mensaje de confirmacion y una variable true
 */
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
                afirmacion:true
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
      mensaje: "id no encontrado",
    });
  }
};

//Hago la ruta para buscar si el email ya esta registrado en el sistema
/**
 * Funcion validar correo electronico
 * @author Mario Miranda
 * @copyright 14/12/2023
 * @param {require} req -datos solicitados para poder ejecutar la funcion, en este caso se necesita el correo del cliente
 * @param {Response} res -los datos que se devolveran al cliente
 * @returns {boolean} -true ,la respuesta, y un mensaje de confirmacion
 */
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

/**
 * Funcion login usuario
 * @author Mario Miranda
 * @copyright 14/12/2023
 * @param {require} req -datos solicitados para poder ejecutar la funcion, en este caso se necesita el correo del usuario y su contraseña
 * @param {Response} res -los datos que se devolveran al cliente
 * @returns  -en caso de un login exitoso se devuelve un token para hacer acciones en la app web y un codigo de verificacion es enviado al correo electronico
 */
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
          const token = jwtVerified(respuesta[0].id_cliente);

          // Enviar código por correo electrónico
          const codigoAcceso = generarCodigoAcceso();
          enviarCorreoElectronico(email_cliente, codigoAcceso);

          return res.status(200).json({
            token: token,
            message: 'Bienvenido, se ha enviado un token a su correo electronico, porfavor digitelo en la doble autenticacion.',
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//controlador para traer usuarios
/**
 * Funcion traer usuarios
 * @author Mario Miranda
 * @copyright 14/12/2023
 * @param {require} req -datos solicitados para poder ejecutar la funcion
 * @param {Response} res -los datos que se devolveran al cliente
 * @returns {boolean} -status true y mensaje de confirmacion
 */
exports.traerUsuarios = async (req, res) => {
  try {
    // Consulta para seleccionar todos los usuarios
    let consulta = "SELECT * FROM clientes";

    baseDeDatos.query(consulta, (err, usuarios) => {
      if (err) {
        console.error("Error en la consulta:", err);
        return res.status(500).json({
          error: "Error en la consulta",
          status: false,
        });
      }

      // Verificar si se encontraron productos
      if (usuarios.length === 0) {
        return res.status(404).json({
          error: "No se encontraron usuarios",
          status: false,
        });
      } else {
        // Devolver la lista de productos
        return res.status(200).json({
          status: true,
          mensaje: "usuarios listados correctamente",
          
        });
      }
    });
  } catch (error) {
    console.error("Error interno:", error.message);
    return res.status(500).json({
      error: "Error interno del servidor",
      status: false,
    });
  }
};




