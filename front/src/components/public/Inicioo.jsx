import { useEffect, useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import { Navigate, NavLink } from "react-router-dom";


import Header from "../private/Header";
import Footerr from "../private/Footer";
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/image1.png";
import jordan from "../../assets/img/jordan.jpg"
const Inicio = () => {

    // Estado para almacenar la URL de la imagen seleccionada
  
  //CREAMOS ESTADOS PARA TRAER TODOS LOS ESTUDIOS
  const [estado, setEstado] = useState(null);
  const [productos, setProductos] = useState(null);
    //TRAE TODOS LOS ESTUDIOS
  const cargarEstudio = async () => {
    fetch(Global.url + "products/listarProductos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductos(data.productos);
        setEstado(data.status);
        console.log(data.productos);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };

  useEffect(() => {
    cargarEstudio();
  }, []);
  return (
    <>
     <Header/>

    <div className="container-fluid">
        <div className="row">
          <div className="col-10">
            <h1>Productos</h1>
            <div className="small-container">
              <h2 className="title">Featured Products</h2>

              <div className="row">
                {estado == true ? (
                  productos.map((producto)=>{
                    return (
                      <>
                  <div className="col-3" key={producto.producto_id}>
                  <a href="product_details.html">
                    <img src={jordan} />
                  </a>
                  <h3>  {producto.nombre_producto}</h3>
                  <hr />
                  <p> Descripcion Del Producto: {producto.descripcion_producto}</p>
                  
                  <hr />
                  <p > Precio del Producto: {producto.precio_producto}</p>
                  <hr />
                  <p >Cantidad del Producto: {producto.stock_producto}</p>
                 <button type="button" className="btn btn-success" style={{margin:"5px"}}> <i className="bi bi-bag"></i> </button> 
             
                
                 
                </div>
                      </>
                    );
                  })
                ):(
                  <>
                  <h3 className="text-center">
                  Lo siento Por ahora no hay productos disponibles 😅
                </h3>
                <p className="text-center">
                  Se actualizara automaticamente la pagina al momento de agregar
                  una.
                </p>
                  </>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
 
    <Footerr/>
    </>
  );
};

export default Inicio;