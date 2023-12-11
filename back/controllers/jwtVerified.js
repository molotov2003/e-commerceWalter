const jwt = require('jsonwebtoken');
const secret = 'tu_clave_secreta'; // Reemplaza con tu clave secreta real

module.exports = {
  // Función para generar un token JWT
  generateToken: (userId) => {
    return jwt.sign({ userId }, secret, { expiresIn: '1d' });
  },

  // Función para verificar un token JWT
  verifyToken: (token) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Token inválido');
      /* return jwt.JsonWebTokenError */
    }
  },
};
