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
                  Lo siento Por ahora no hay cards 😅
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

   
    <div className="offer">
        <div className="small-container">
            <div className="row">
                <div className="col-2">
                    <img src="images/exclusive.png" className="offer-img"/>
                </div>
                <div className="col-2">
                    <p>Exclusively Available on RedStore</p>
                    <h1>Smart Band 4</h1>
                    <small>The Mi Smart Band 4 fearures a 39.9%larger (than Mi Band 3) AMOLED color full-touch display
                        with adjustable brightness, so everything is clear as can be.<br/></small>
                    <a href="products.html" className="btn">Buy Now &#8594;</a>
                </div>
            </div>
        </div>
    </div>

   
    <div className="testimonial">
        <div className="small-container">
            <div className="row">
                <div className="col-3">
                    <i className="fa fa-quote-left"></i>
                    <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        industrys standard dummy text.</p>
                    <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                    <img src="images/user-1.png"/>
                    <h3>Sean Parker</h3>
                </div>
                <div className="col-3">
                    <i className="fa fa-quote-left"></i>
                    <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        industrys standard dummy text.</p>
                    <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                    <img src="images/user-2.png"/>
                    <h3>Mike Smith</h3>
                </div>
                <div className="col-3">
                    <i className="fa fa-quote-left"></i>
                    <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        industrys standard dummy text.</p>
                    <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                    <img src="images/user-3.png"/>
                    <h3>Mabel Joe</h3>
                </div>
            </div>
        </div>
    </div>

  

    <div className="brands">
        <div className="small-container">
            <div className="row">
                <div className="col-5">
                    <img src="images/logo-godrej.png"/>
                </div>
                <div className="col-5">
                    <img src="images/logo-oppo.png"/>
                </div>
                <div className="col-5">
                    <img src="images/logo-coca-cola.png"/>
                </div>
                <div className="col-5">
                    <img src="images/logo-paypal.png"/>
                </div>
                <div className="col-5">
                    <img src="images/logo-philips.png"/>
                </div>
            </div>
        </div>
    </div>

 
    <Footerr/>
    </>
  );
};

export default Inicio;