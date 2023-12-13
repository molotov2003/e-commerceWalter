const { response } = require("express");
const baseDeDatos = require("../modules/Conexion");
const jwtVerified = require("./jwtVerified");

//controllador de insertar categorias

exports.insertarCagetorias = async (req, res) => {
  try {
    const data = {
      categoria_id: req.body.categoria_id,
      nombre_categoria: req.body.nombre_categoria,
     
    };
    //Validamos los datos
    if (
      !data.nombre_categoria|| !data.categoria_id
    ) {
      return res.status(400).json({
        error: true,
        mensaje: "debe llenar todos los campos",
        return: false,
      });
    }
    // Consulta SQL parametrizada
    const sql =
      "INSERT INTO categorias(categoria_id, nombre_categoria) VALUES (?, ?)";
    baseDeDatos.query(
      sql,
      [
        data.categoria_id,
        data.nombre_categoria,
        
      ],
      (error, response) => {
        try {
          if (error) {
            return res.status(400).json({
              error: error,
              mensaje: "Error al insertar la catategoria",
              return: false,
            });
          } else {
            return res.status(200).json({
              response: response,
              mensaje: "categoria agregado correctamente",
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
    return res.status(500).json({ error: "datos Invalidos" });
  }
};

//controllador editar Categorias
exports.editarCategorias = async (req, res) => {
  try {
    let producto_id = req.params.producto_id;
    const data = {
      nombre_producto: req.body.nombre_producto,
      descripcion_producto: req.body.descripcion_producto,
      precio_producto: req.body.precio_producto,
      stock_producto: req.body.stock_producto,
      img: req.body.img,
    };

    //Validamos los datos
    if (
      !data.nombre_producto ||
      !data.descripcion_producto ||
      !data.precio_producto ||
      !data.stock_producto ||
      !data.img
    ) {
      return res.status(400).json({
        error: true,
        mensaje: "debe llenar todos los campos",
        return: false,
      });
    }

    //consulta sql parametrizada
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
            error: true,
            mensaje: "Error interno del servidor",
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ error: "datos Invalidos" });
  }
};
  
//controlador eliminaCategorias
exports.eliminarCategorias = async (req, res) => {
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

//controllador traerCategorias
/**
 * Obtiene la lista de productos.
 *
 * @function traerProductos
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Objeto JSON que contiene la respuesta.
 */
exports.traerCategorias = async (req, res) => {
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
