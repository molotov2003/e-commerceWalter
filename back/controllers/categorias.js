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
    let catagoria_id = req.params.categoria_id;
    
     let nombre_categoria= req.body.nombre_categoria
    

    //Validamos los datos
    if (
      !nombre_categoria
    ) {
      return res.status(400).json({
        error: true,
        mensaje: "debe llenar todos los campos",
        return: false,
      });
    }

    //consulta sql parametrizada
    let consultaSql =
      "UPDATE categorias SET nombre_categoria = ? WHERE categoria_id = ?";
    baseDeDatos.query(
      consultaSql,[
        nombre_categoria,
        catagoria_id],
      (err, response) => {
        try {
          if (err) {
            return res.status(400).json({
              error: true,
              mensaje: "Error en la consulta, mirar los datos!",
              return: false,
            });
          } if(response.affectedRows>0){
            return res.status(200).json({
              response: response,
              mensaje: "Producto actualizado correctamente",
              return: true,
            });
          }
          else{
            return res.status(200).json({
                response: err,
                mensaje: "No se ha actualizado una monda",
                return: false,
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
    const categoria_id = req.params.categoria_id;

    //Consulta parametrizada
    let consultaEliminarCategoria =
      "DELETE FROM categorias WHERE categoria_id = ?";

    baseDeDatos.query(
      consultaEliminarCategoria,
      categoria_id,
      (err, response) => {
        try {
          if (err) {
            return res.status(400).json({
              error: err.message,
              mensaje: "Error al eliminar la categoria",
              return: false,
            });
          } else {
            return res.status(200).json({
              mensaje: "categoria eliminada correctamente",
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
    let consulta = "SELECT * FROM categorias";

    baseDeDatos.query(consulta, (err, productos) => {
      if (err) {
        console.error("Error en la consulta:", err);
        return res.status(500).json({
          error: err.message,
          status: false,
          message:"Error en la consulta"
        });
      }

      // Verificar si se encontraron productos
      if (productos.length === 0) {
        return res.status(200).json({
          error: "No se encontraron categorias",
          status: false,
        });
      } else {
        // Devolver la lista de productos
        return res.status(200).json({
          status: true,
          mensaje: "categorias listadas correctamente",
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
