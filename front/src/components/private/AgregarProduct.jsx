import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Footerr from "./Footer"
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/image1.png";

const AgregarProduct = () => {
  // Estado para almacenar la URL de la imagen seleccionada
  const [imagenPreview, setImagenPreview] = useState(null);

  // Manejar cambios en el input de archivo
  const handleImagenChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Actualizar el estado con la URL de la imagen seleccionada
        setImagenPreview(reader.result);
      };

      // Leer el contenido de la imagen como URL base64
      reader.readAsDataURL(file);
    }
  };

  // Resto del código...

  return (
    <>
     <Header/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
            <div className="wrapper" id="product">
              <div className="innerr">
                <form action="">
                  {/* ... Otros campos de formulario ... */}

                  <div className="form-wrapper">
						<label htmlFor="">Id del Producto</label>
						<input type="text" className="form-control"/>
					</div>
					<div className="form-wrapper">
						<label htmlFor="">Nombre Del Producto</label>
						<input type="text" className="form-control"/> 
					</div>
                    <div className="form-wrapper">
						<label htmlFor="">Descripcion</label>
						<input type="text" className="form-control"/>
					</div>
					<div className="form-wrapper">
						<label htmlFor="">Cantidad</label>
						<input type="text" className="form-control"/> 
					</div>
                    <div className="form-wrapper">
						<label htmlFor="">Precio</label>
						<input type="text" className="form-control"/>
					</div>
					
                  <div className="form-wrapper">
                    <label htmlFor="">Imagen</label>
                    <input
                      type="file"
                      id="imagen"
                      name="imagen"
                      accept="image/*"
                      onChange={handleImagenChange}
                    />
                  </div>

                  {/* Resto del formulario... */}

                  <button>Agregar Producto</button>
                </form>
              </div>
            </div>
          </div>

          <div className="d">
            {/* Mostrar la vista previa de la imagen seleccionada */}
            {imagenPreview && (
              <img
              src={imagenPreview}
              alt="Vista previa de la imagen"
              style={{ width: "100%", height: "auto", maxHeight: "200px" }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
            <div className="col-10">
                <h1>Productos</h1>
                <div className="small-container">
        <h2 className="title">Featured Products</h2>
        <div className="row">
            <div className="col-4">
                <a href="product_details.html"><img src="images/product-1.jpg"/></a>
                <h4>Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="bi bi-trash3"></i>
                </div>
                <i className="bi bi-trash3"></i>
                <h2>fdsf</h2>
                <p>$50.00</p>
            </div>
            <div className="col-4">
                <img src="images/product-2.jpg"/>
                <h4>Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <p>$50.00</p>
            </div>
            <div className="col-4">
                <img src="images/product-3.jpg"/>
                <h4>Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <p>$50.00</p>
            </div>
            <div className="col-4">
                <img src="images/product-4.jpg"/>
                <h4>Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <p>$50.00</p>
            </div>
        </div>
        <h2 className="title">Latest Products</h2>
        <div className="row">
            <div className="col-4">
                <img src="images/product-5.jpg"/>
                <h4>Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <p>$50.00</p>
            </div>
            <div className="col-4">
                <img src="images/product-6.jpg"/>
                <h4>Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <p>$50.00</p>
            </div>
            <div className="col-4">
                <img src="images/product-7.jpg"/>
                <h4>Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <p>$50.00</p>
            </div>
            <div className="col-4">
                <img src="images/product-8.jpg"/>
                <h4>Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <p>$50.00</p>
            </div>
        </div>
        <div className="row">
            <div className="col-4">
                <img src="images/product-9.jpg"/>
                <h4>Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <p>$50.00</p>
            </div>
            <div className="col-4">
                <img src="images/product-10.jpg"/>
                <h4>Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <p>$50.00</p>
            </div>
            <div className="col-4">
                <img src="images/product-11.jpg"/>
                <h4>Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <p>$50.00</p>
            </div>
            <div className="col-4">
                <img src="images/product-12.jpg"/>
                <h4>Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <p>$50.00</p>
            </div>
        </div>
    </div>

            </div>
        </div>
      </div>
     <Footerr/>
    </>
  );
};

export default AgregarProduct;
