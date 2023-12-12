function generarCodigoAcceso () {
    // Lógica para generar un código de acceso, por ejemplo, un número aleatorio
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  module.exports=generarCodigoAcceso