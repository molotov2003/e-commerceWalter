const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
// Cargar variables de entorno desde el archivo .env
dotenv.config();

/**
 * Funcion insertar categorias
 * @author Mario Miranda
 * @copyright 14/12/2023
 * @param {destinatario} destinatario -datos del usuario al que le llegara el correo electronico
 * @param {codigoAcceso} codigoAcceso -codigo que se genera para poder acceder a la app
 * @returns {boolean} -true ,la respuesta, y un mensaje de confirmacion
 */
function enviarCorreoElectronico(destinatario,codigoAcceso){
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
     /*  from: 'msmario1722@gmail.com', */
      to: destinatario,
      subject: 'Código de Acceso',
      text: `Ingresa este codigo de verificacion para iniciar sesion:${codigoAcceso}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
      } else {
        console.log('Correo enviado:', info.response);
      }
    });
  }

  module.exports=enviarCorreoElectronico