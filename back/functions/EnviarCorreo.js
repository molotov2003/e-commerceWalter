const nodemailer = require("nodemailer");
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