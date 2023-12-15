const { response } = require("express");
const baseDeDatos = require("../modules/Conexion");
const jwtVerified = require("./jwtVerified");
const multer = require("multer");

//funcion multer para subir imagenes
/**
 * Funcion para configurar multer para poder subir imganes
 * @author Mario Miranda
 * @method multer.diskStorage -objeto que contiene dos funciones , destino, y el nombre del archivo
 * @copyright 14/12/2023
 * @returns  -devuelve el multer con el lugar donde se almacenaran los archivos
 */
const configurarMulter = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images"); // Carpeta donde se almacenarán las imágenes
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

  //img es el nombre del campo en BD
  return multer({ storage: storage }).single("img");
};

//controllador de insertar productos
/**
 * Funcion insertar categorias
 * @author Mario Miranda
 * @copyright 14/12/2023
 * @param {require} req -datos solicitados para poder ejecutar la funcion, en este caso se necesita el id de la categoria y el nombre
 * @param {Response} res -los datos que se devolveran al cliente
 * @returns {boolean} -true ,la respuesta, y un mensaje de confirmacion
 */
exports.insertarProductos = async (req, res) => {
  try {
    const upload = configurarMulter();
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Ocurrió un error de Multer
        return res.status(400).json({
          error: err.message,
          mensaje: "Error al cargar la imagen",
          return: false,
        });
      } else if (err) {
        // Otro tipo de error
        return res.status(500).json({
          error: err.message,
          mensaje: "Error interno del servidor",
          return: false,
        });
      }

      const data = {
        producto_id: req.body.producto_id,
        nombre_producto: req.body.nombre_producto,
        descripcion_producto: req.body.descripcion_producto,
        precio_producto: req.body.precio_producto,
        stock_producto: req.body.stock_producto,
        img: req.file.filename, // Nombre del archivo de imagen cargado
      };

      // Validamos los datos
      if (
        !data.nombre_producto ||
        !data.descripcion_producto ||
        !data.precio_producto ||
        !data.stock_producto ||
        !data.img
      ) {
        return res.status(400).json({
          error: true,
          mensaje: "Debe llenar todos los campos",
          return: false,
        });
      }

      // Consulta SQL parametrizada
      const sql =
        "INSERT INTO productos (producto_id, nombre_producto, descripcion_producto, precio_producto, stock_producto, img) VALUES (?, ?, ?, ?, ?, ?)";

      baseDeDatos.query(
        sql,
        [
          data.producto_id,
          data.nombre_producto,
          data.descripcion_producto,
          data.precio_producto,
          data.stock_producto,
          data.img,
        ],
        (error, response) => {
          try {
            if (error) {
              return res.status(400).json({
                error: error.message,
                mensaje: "Error al insertar los productos",
                return: false,
              });
            } else {
              return res.status(200).json({
                response: response,
                mensaje: "Producto agregado correctamente",
                return: true,
              });
            }
          } catch (error) {
            console.error("Error interno:", error.message);
            return res.status(500).json({
              error: error.menssage,
              mensaje: "Error interno del servidor",
              return: false,
            });
          }
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error: "Datos inválidos" });
  }
};
//controllador editar productos
exports.editarProductos = async (req, res) => {
  try {
    const upload = configurarMulter();
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Ocurrió un error de Multer
        return res.status(400).json({
          error: err.message,
          mensaje: "Error al cargar la imagen",
          return: false,
        });
      } else if (err) {
        // Otro tipo de error
        return res.status(500).json({
          error: err.message,
          mensaje: "Error interno del servidor",
          return: false,
        });
      }
let producto_id=req.params.producto_id;
      const data = {
        nombre_producto: req.body.nombre_producto,
        descripcion_producto: req.body.descripcion_producto,
        precio_producto: req.body.precio_producto,
        stock_producto: req.body.stock_producto,
        img: req.file.filename, // Nombre del archivo de imagen cargado
      };

      // Validamos los datos
      if (
        !data.nombre_producto ||
        !data.descripcion_producto ||
        !data.precio_producto ||
        !data.stock_producto ||
        !data.img
      ) {
        return res.status(400).json({
          error: true,
          mensaje: "Debe llenar todos los campos",
          return: false,
        });
      }

      // Consulta SQL parametrizada
      let consultaSql =
        "UPDATE productos SET nombre_producto = ?, descripcion_producto = ?, precio_producto = ?, stock_producto = ? , img = ? WHERE producto_id = ?";
      baseDeDatos.query(
        consultaSql,
        [
          data.nombre_producto,
          data.descripcion_producto,
          data.precio_producto,
          data.stock_producto,
          data.img,
          producto_id,
        ],
        (err, response) => {
          try {
            if (err) {
              return res.status(400).json({
                error: true,
                mensaje: "Error al insertar los datos",
                return: false,
              });
            } else {
              return res.status(200).json({
                response: response,
                mensaje: "Producto actualizado correctamente",
                return: true,
              });
            }
          } catch (error) {
            console.error("Error interno:", error.message);
            return res.status(500).json({
              error: error.menssage,
              mensaje: "Error interno del servidor",
              return: false,
            });
          }
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error: "Datos inválidos" });
  }
};

//controlador eliminarProductos
exports.eliminarProductos = async (req, res) => {
  try {
    const producto_id = req.params.producto_id;

    //Consulta parametrizada

    let consultaEliminarProducto =
      "DELETE FROM productos WHERE producto_id = ?";

    baseDeDatos.query(
      consultaEliminarProducto,
      producto_id,
      (err, response) => {
        try {
          if (err) {
            return res.status(400).json({
              error: true,
              mensaje: "Error al eliminar producto",
              return: false,
            });
          } else {
            return res.status(200).json({
              response: response,
              mensaje: "producto eliminado correctamente",
              return: true,
            });
          }
        } catch (error) {
          console.error("Error interno:", error.message);
          return res.status(500).json({
            error: true,
            mensaje: "Error interno del servidor",
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ error: "id no existente" });
  }
};

//controllador traerProductos
/**
 * Obtiene la lista de productos.
 *
 * @function traerProductos
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Objeto JSON que contiene la respuesta.
 */
exports.traerProductos = async (req, res) => {
  try {
    // Consulta para seleccionar todos los productos
    let consulta = "SELECT * FROM productos";

    baseDeDatos.query(consulta, (err, productos) => {
      if (err) {
        console.error("Error en la consulta:", err);
        return res.status(500).json({
          error: "Error en la consulta",
          status: false,
        });
      }

      // Verificar si se encontraron productos
      if (productos.length === 0) {
        return res.status(404).json({
          error: "No se encontraron productos",
          status: false,
        });
      } else {
        // Devolver la lista de productos
        return res.status(200).json({
          status: true,
          mensaje: "Productos listados correctamente",
          productos: productos,
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
