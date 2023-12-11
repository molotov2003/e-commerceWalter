
//Middleware para validar el jsonwebtoken
const SECRET_KEY = "tu_clave_secreta";
const auth = async (req, res, next) => {
  // Verifica el token válido en el encabezado de la solicitud, Authorization
  const jwtToken = req.header("Authorization");

  if (!jwtToken) {
    return res.status(401).json({
      resultado: "error",
      mensaje: "Acceso denegado, no tiene un token válido",
    });
  }

  try {
    const payload = await jwt.verify(jwtToken,SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      resultado: "error",
      mensaje: "Token inválido",
    });
  }
};

module.exports = auth;