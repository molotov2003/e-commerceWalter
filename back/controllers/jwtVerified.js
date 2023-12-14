const jwt = require('jsonwebtoken');
const secret = 'tu_clave_secreta'; // Reemplaza con tu clave secreta real

/* module.exports = {
  // Función para generar un token JWT
  generateToken: (userId) => {
    return jwt.sign({ userId }, secret, { expiresIn: '1d' });
  },

};
 */

/**
 * @author Mario Miranda
 * @copyright 14/12/2023
 * funcion que generea un JsonWebToken para poder hacer las funciones del sistema
 * @param {int} userId-campo necesario para asignar un token  
 * @returns -el token generado y cuanto tiempo expira el token
 */
const generateToken=(userId)=>{
  return jwt.sign({ userId }, secret, { expiresIn: '1d' });
}

module.exports=generateToken
