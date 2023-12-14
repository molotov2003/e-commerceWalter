
const jwt = require('jsonwebtoken');
/**
 * Funcion AUTH que sirve para validar el token generado al momento de hacer cualquier operacion del sistema
 * @author Mario Miranda
 * @copyright 14/12/2023
 * @param {require} req -datos solicitados para poder ejecutar la funcion, en este caso se necesita el token de autenticacion
 * @param {Response} res -los datos que se devolveran al cliente
 * @param {Function} next -funcion que se utiliza para seguir al siguiente middelware
 * @returns 
 */
const auth = async (req, res,next) => {
const secretKey="tu_clave_secreta";
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      resultado: "error",
      mensaje: "Acceso denegado, no tiene un token válido",
    });
  }
  try {
    const payload = await jwt.verify(token,secretKey);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      resultado: error.message,
      mensaje: "Token inválido",
    });
  }
};

module.exports = auth;