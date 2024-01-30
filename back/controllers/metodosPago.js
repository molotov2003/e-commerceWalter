const { response } = require("express");
const baseDeDatos = require("../modules/Conexion");
const jwtVerified = require("./jwtVerified");
const util = require("util"); //la trae por defecto node js me permite usar async/await opcion a fetch
const baseDeDatosQuery = util.promisify(baseDeDatos.query).bind(baseDeDatos);



//InsertarMetodoDePago
exports.insertarMetodoPago = async (req, res) => {
    try {
      const data = {
        Descripcion: req.body.Descripcion,
       
      };
      //Validamos los datos
      if (
        !data.Descripcion
      ) {
        return res.status(400).json({
          error: true,
          mensaje: "debe llenar todos los campos",
          return: false,
        });
      }
      // Consulta SQL parametrizada
      const sql =
        "INSERT INTO metodopago(Descripcion) VALUES (?)";
      baseDeDatos.query(
        sql,
        [
          data.Descripcion,
        ],
        (error, response) => {
          try {
            if (error) {
              return res.status(400).json({
                error: error,
                mensaje: "Error al insertar el metodo",
                return: false,
              });
            } else {
              return res.status(200).json({
                response: true,
                mensaje: "metodo de pago agregado correctamente",
                return: true,
              });
            }
          } catch (error) {
            console.error("Error interno:", error.message);
            return res.status(500).json({
              error: false,
              mensaje: "Error interno del servidor",
            });
          }
        }
      );
    } catch (error) {
      return res.status(500).json({ error: "datos Invalidos" });
    }
  };

//editar metodo de pago
exports.editarMetodosPago = async (req, res) => {
    try {
      let idMetodo = req.params.idMetodo;
      
       let Descripcion= req.body.Descripcion
      
  
      //Validamos los datos
      if (
        !Descripcion
      ) {
        return res.status(400).json({
          error: true,
          mensaje: "debe llenar todos los campos",
          return: false,
        });
      }
  
      //consulta sql parametrizada
      let consultaSql =
        "UPDATE metodopago SET Descripcion = ? WHERE idMetodo = ?";
      baseDeDatos.query(
        consultaSql,[
            Descripcion,
            idMetodo],
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
                mensaje: "Metodo De Pago actualizado correctamente",
                return: true,
              });
            }
            else{
              return res.status(200).json({
                  response: err,
                  mensaje: "No se ha encontrado ningun Metodo De pago",
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

//Eliminar metodosPago
exports.eliminarMetodoDePago = async (req, res) => {
    try {
      const idMetodo = req.params.idMetodo;
  
      //Consulta parametrizada
      let consultaEliminarCategoria =
        "DELETE FROM metodopago WHERE idMetodo = ?";
  
      baseDeDatos.query(
        consultaEliminarCategoria,
        idMetodo,
        (err, response) => {
          try {
            if (err) {
              return res.status(400).json({
                error: err.message,
                mensaje: "Error al eliminar el metodo de pago",
                return: false,
              });
            } else {
              return res.status(200).json({
                mensaje: "metodo de pago eliminada correctamente",
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

//Traer Metodos De pago
exports.traerMetodosDePago = async (req, res) => {
    try {
      // Consulta para seleccionar todos los productos
      let consulta = "SELECT * FROM metodopago";
  
      baseDeDatos.query(consulta, (err, response) => {
        if (err) {
          console.error("Error en la consulta:", err);
          return res.status(500).json({
            error: err.message,
            status: false,
            message:"Error en la consulta"
          });
        }
  
        // Verificar si se encontraron productos
        if (response.length === 0) {
          return res.status(200).json({
            error: "No se encontraron Metodos de pago",
            status: false,
          });
        } else {
          // Devolver la lista de productos
          return res.status(200).json({
            status: true,
            mensaje: "Metodos de pago listadas correctamente",
            categorias: response,
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