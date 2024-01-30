const { response } = require("express");
const baseDeDatos = require("../modules/Conexion");
const nodemailer = require("nodemailer");
const util = require("util"); //la trae por defecto node js me permite usar async/await opcion a fetch
// Promisificar la función execute en lugar de query
const baseDeDatosQuery = util.promisify(baseDeDatos.execute).bind(baseDeDatos);


exports.listarEncabezados = async (req, res) => {
    try {
      // Consulta para seleccionar todos los productos
      let consulta =
        "SELECT encabezado.idEncabezado, encabezado.FechayHora, encabezado.total, encabezado.idEstado, clientes.nombre_cliente, clientes.email_cliente, metodopago.Descripcion AS 'MetodoPago' FROM encabezado JOIN clientes ON encabezado.idUsuario = clientes.id_cliente JOIN metodopago ON encabezado.idMetodo = metodopago.idMetodo";
  
      const response = await new Promise((resolve, reject) => {
        baseDeDatos.query(consulta, (err, result) => {
          if (err) {
            console.error("Error en la consulta:", err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      // Verificar si se encontraron encabezados
      if (response.length === 0) {
        return res.status(200).json({
          status: false,
          mensaje: "No se encontraron encabezados",
        });
      } else {
        // Devolver la lista de encabezados en la respuesta
        return res.status(200).json({
          status: true,
          mensaje: "Encabezados listados correctamente",
          encabezados: response,
        });
      }
    } catch (error) {
      console.error("Error interno:", error.message);
      return res.status(500).json({
        status: false,
        error: "Error interno del servidor",
      });
    }
  };

  exports.listarEncabezadosUsuario = async (req, res) => {
    try {
      // Consulta para seleccionar los encabezados del usuario específico
      const consulta =
        "SELECT encabezado.idEncabezado, encabezado.FechayHora, encabezado.total, encabezado.idEstado, clientes.nombre_cliente, clientes.email_cliente, metodopago.Descripcion AS 'MetodoPago' FROM encabezado JOIN clientes ON encabezado.idUsuario = clientes.id_cliente JOIN metodopago ON encabezado.idMetodo = metodopago.idMetodo WHERE encabezado.idUsuario = ?";
  
      const response = await new Promise((resolve, reject) => {
        baseDeDatos.query(consulta, [req.params.idUsuario], (err, result) => {
          if (err) {
            console.error("Error en la consulta:", err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      // Verificar si se encontraron encabezados
      if (response.length === 0) {
        return res.status(200).json({
          status: false,
          mensaje: "No se encontraron encabezados",
        });
      } else {
        // Devolver la lista de encabezados en la respuesta
        return res.status(200).json({
          status: true,
          mensaje: "Encabezados listados correctamente",
          encabezados: response,
        });
      }
    } catch (error) {
      console.error("Error interno:", error.message);
      return res.status(500).json({
        status: false,
        error: "Error interno del servidor",
      });
    }
  };
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  
  exports.enviarCorreoFactura = async (req, res) => {
    try {
        let id_cliente = req.body.id_cliente;
        let idMetodo = req.body.idMetodo;

        // Consulta para obtener información del usuario
        const userQuery = `SELECT * FROM clientes WHERE id_cliente=${id_cliente}`;
        const [userRows] = await baseDeDatosQuery(userQuery);

        // Consulta para obtener información del método de pago
        const metodoQuery = `SELECT * FROM metodopago WHERE idMetodo = ${idMetodo}`;
        const [metodoRows] = await baseDeDatosQuery(metodoQuery);

        // Consulta para obtener el último ID de encabezado
        const encabezadoQuery = `SELECT MAX(idEncabezado) AS Maximo FROM encabezado`;
        const [encabezadoRows] = await baseDeDatosQuery(encabezadoQuery);
        console.log(encabezadoRows)

        // Verificar si se encontró el último ID de encabezado
        if (!encabezadoRows || !encabezadoRows || encabezadoRows.Maximo === null) {
            throw new Error("No se encontró el último ID de encabezado.");
        }

        const subtotalQuery = `SELECT total FROM encabezado WHERE idEncabezado=${encabezadoRows.Maximo}`;
        const [subtotalRows] = await baseDeDatosQuery(subtotalQuery);

        // Formatear el precio
        const formatearPrecio = (precio) => {
            return precio.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };

        // Consulta para obtener detalles de la compra
        const Detalle = await baseDeDatosQuery(`SELECT productos.nombre_producto, detalles_pedido.cantidad, productos.precio_producto, detalles_pedido.subtotal FROM productos INNER JOIN detalles_pedido ON detalles_pedido.producto_id = productos.producto_id INNER JOIN encabezado ON encabezado.idEncabezado = detalles_pedido.detalle_id AND detalles_pedido.detalle_id= ${encabezadoRows.Maximo}`);

        // Construir la tabla de detalles
        let detalleTabla = "";
        for (let i = 0; i < Detalle.length; i++) {
            detalleTabla +=
                `<tr>
            <td>${Detalle[i].nombre_producto}</td>
            <td>${Detalle[i].cantidad}</td>
            <td>$${formatearPrecio((Detalle[i]?.precio_producto ?? 0).toString())}</td>
            <td>$${formatearPrecio((Detalle[i]?.subtotal ?? 0).toString())}</td>
        </tr>`;
        }

        // HTML para el correo
        const html = `<!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Confirmación de Compra</title>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                overflow-x: auto; /* Agrega barras de desplazamiento horizontal si la tabla es demasiado ancha */
              }
        
              th,
              td {
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
                white-space: nowrap; /* Evita el desbordamiento de texto en varias líneas */
                font-size: 70%;
              }
        
              th {
                background-color: #cfb658;
                color: #fff;
              }
        
              td {
                background-color: #f2f2f2;
              }
              body {
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f2f2f2;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              }
              h2 {
                color: white;
              }
        
              h3 {
                color: #cfb658;
              }
              p,
              strong {
                color: #555;
              }
              strong {
                font-weight: bold;
              }
              .header {
                background-color: #cfb658;
                color: #fff;
                text-align: center;
                padding: 10px;
                border-radius: 8px 8px 0 0;
              }
              .thank-you {
                text-align: center;
                color: #cfb658;
                font-size: 1.2em;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Confirmación de Compra</h2>
              </div>
        
              <p class="thank-you">
                ¡Gracias por tu compra en <strong>UrbanPulse Store</strong>!
              </p>
        
              <h3>Detalles de la Tienda</h3>
              <p>Teléfono: <strong>3024556897</strong></p>
              <p>Dirección: <strong>limonar, Cartago, Valle del Cauca</strong></p>
        
              <h3>Detalles de la Compra</h3>
              <p>
                Total a Pagar:
                <strong>${subtotalRows.total.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  "."
                )}</strong>
              </p>
              <p>Fecha y Hora de la Compra: <strong>${
                req.body.FechayHora
              }</strong></p>
        
              <h3>Datos del Usuario</h3>
               <p>Identificación: <strong>${req.body.id_cliente}</strong></p>
            <p>Nombres: <strong>${userRows.nombre_cliente}</strong></p>
            <p>Dirección: <strong>${userRows.direccion_cliente}</strong></p>
            <p>Correo: <strong>${userRows.email_cliente}</strong></p>
        
              <h3>Resumen de Compra</h3>
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Ejemplo de un producto, puedes repetir esta fila para cada producto -->
                  ${detalleTabla}
                  <!-- Puedes agregar más filas según la cantidad de productos -->
                </tbody>
              </table>
        
              <h3>Método de Pago</h3>
              <p>Método de Pago: <strong>${metodoRows.Descripcion}</strong></p>
        
              <h3>Total de Compra</h3>
              <p>Total: <strong>${subtotalRows.total.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g,
                "."
              )}</strong></p>
        
              <p class="thank-you">
                ¡Gracias por elegirnos! Esperamos que disfrutes de tu compra.
              </p>
            </div>
          </body>
        </html>
        
        `;

        // Configuración del correo
        const info = await transporter.sendMail({
            from: `SOPORTE DE COMPRA #${encabezadoRows.Maximo} <am17222001@gmail.com>`,
            to: `afelipecarmona2003@gmail.com,${userRows.email_cliente},afelipecarmona2003@gmail.com`,
            subject: "Confirmación de Compra ✔",
            text: "Espero que te encuentres bien :)",
            html: html,
            detalleTabla:detalleTabla
        });

        res.send({ id: 200, mensaje: "Soporte Enviado" });

    } catch (error) {
        res.send({ id: 400, mensaje: `Error: ${error.message}` });
    }
};



const enviarCorreo = async (req, res) => {
    //CAPTURAR INFO DEL USER
    try {
      let id = req.body.id;
      let idMetodo = req.body.idMetodo;
      const User = await sequelize.query(
        `SELECT * FROM usuario WHERE idUsuario=${id}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      const Metodo = await sequelize.query(
        `SELECT * FROM metodopago WHERE idMetodo = ${idMetodo} `,
        {
          type: QueryTypes.SELECT,
        }
      );
  
      const Enacabezado = await sequelize.query(
        `SELECT MAX(idEncabezado) AS Maximo FROM encabezado`,
        {
          type: QueryTypes.SELECT,
        }
      );
      const TotalEnca = await sequelize.query(
        `SELECT Total FROM encabezado WHERE idEncabezado=${Enacabezado[0].Maximo}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      const formatearPrecio = (precio) => {
        return precio.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
      const Detalle = await sequelize.query(
        `SELECT producto.Nombre, detalle.Cantidad, producto.Precio, detalle.Totalprod FROM producto INNER JOIN detalle ON detalle.idProducto = producto.idProducto INNER JOIN encabezado ON encabezado.idEncabezado = detalle.idEncabezado AND detalle.idEncabezado = ${Enacabezado[0].Maximo}`,
        {
          type: QueryTypes.SELECT,
        }
      );
  
      //console.log(Detalle);
      let detalleTabla = "";
      for (let i = 0; i < Detalle.length; i++) {
        detalleTabla =
          detalleTabla +
          `<tr>
        <td>${Detalle[i].Nombre}</td>
        <td>${Detalle[i].Cantidad}</td>
        <td>$${Detalle[i].Precio.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          "."
        )}</td>
        <td>$${Detalle[i].Totalprod.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          "."
        )}</td>
      </tr>`;
      }
      //console.log("LA TABLA =", detalleTabla);
      // send mail with defined transport object
      const html = `<!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Confirmación de Compra</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              overflow-x: auto; /* Agrega barras de desplazamiento horizontal si la tabla es demasiado ancha */
            }
      
            th,
            td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
              white-space: nowrap; /* Evita el desbordamiento de texto en varias líneas */
              font-size: 70%;
            }
      
            th {
              background-color: #722cce;
              color: #fff;
            }
      
            td {
              background-color: #f2f2f2;
            }
            body {
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f2f2f2;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 8px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            h2 {
              color: white;
            }
      
            h3 {
              color: #722cce;
            }
            p,
            strong {
              color: #555;
            }
            strong {
              font-weight: bold;
            }
            .header {
              background-color: #722cce;
              color: #fff;
              text-align: center;
              padding: 10px;
              border-radius: 8px 8px 0 0;
            }
            .thank-you {
              text-align: center;
              color: #722cce;
              font-size: 1.2em;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Confirmación de Compra</h2>
            </div>
      
            <p class="thank-you">
              ¡Gracias por tu compra en <strong>GAMESOFT</strong>!
            </p>
      
            <h3>Detalles de la Tienda</h3>
            <p>Teléfono: <strong>3234681033</strong></p>
            <p>Dirección: <strong>EL BERLIN, Cartago, Valle del Cauca</strong></p>
      
            <h3>Detalles de la Compra</h3>
            <p>
              Total a Pagar:
              <strong>${subtotalRows.Total.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g,
                "."
              )}</strong>
            </p>
            <p>Fecha y Hora de la Compra: <strong>${
              req.body.fechaYhora
            }</strong></p>
      
            <h3>Datos del Usuario</h3>
            <p>Identificación: <strong>${req.body.id_cliente}</strong></p>
            <p>Nombres: <strong>${User[0].nombre_cliente}</strong></p>
            <p>Dirección: <strong>${User[0].Direccion}</strong></p>
            <h3>Resumen de Compra</h3>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <!-- Ejemplo de un producto, puedes repetir esta fila para cada producto -->
                ${detalleTabla}
                <!-- Puedes agregar más filas según la cantidad de productos -->
              </tbody>
            </table>
      
            <h3>Método de Pago</h3>
            <p>Método de Pago: <strong>${Metodo[0].Descripcion}</strong></p>
      
            <h3>Total de Compra</h3>
            <p>Total: <strong>${subtotalRows.Total.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              "."
            )}</strong></p>
      
            <p class="thank-you">
              ¡Gracias por elegirnos! Esperamos que disfrutes de tu compra.
            </p>
          </div>
        </body>
      </html>
      
      `;
  
      const info = await transporter.sendMail({
        from: `SOPORTE DE COMPRA #${Enacabezado[0].Maximo} <jotacodigos@gmail.com>`, // sender address
        to: `juan3407rincon@gmail.com,${User[0].Correo}, berserkups@gmail.com`, // list of receivers
        subject: "Confirmación de Compra ✔", // Subject line
        text: "Espero que te encuentres bien :)", // plain text body
        html: html, // html body
      });
      res.send({ id: 200, mensaje: "Soporte Enviado" });
      console.log("Message sent: %s", info.messageId);
      console.log(info);
    } catch (error) {
      res.send({ id: 400, mensaje: `Error: ${error.message}` });
    }
  };

  

  