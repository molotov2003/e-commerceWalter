const mysql = require("mysql"); //instanciamos el modulo MYSQL

//Creamos la conexion
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e-commerce2",
});

//Nos conectamos a la BD

conexion.connect((error) => {
  if (error) {
    throw "existe un error en la cadena de conexion !";
  } else {
    console.log("Conexión Exitosa !");
  }
});
module.exports=conexion;