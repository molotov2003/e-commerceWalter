import { useEffect, useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import { Navigate, NavLink } from "react-router-dom";

import Swal from "sweetalert2";
import Header from "./Header";
import Footerr from "./Footer";
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/image1.png";

const AgregarProduct = () => {
  // Estado para almacenar la URL de la imagen seleccionada
  const [imagenPreview, setImagenPreview] = useState(null);
  //CREAMOS ESTADOS PARA TRAER TODOS LOS ESTUDIOS
  const [estado, setEstado] = useState(null);
  const [productos, setProductos] = useState(null);
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
  //REDIRECCIONA

  const { form, cambiar } = HelperForm({});
  const [, setGuardado] = useState("");
  const [navLink, setnavLink] = useState(false);

  //MENSAJE DE LOS CAMPOS VACIOS
  const mostrarCamposVaciosAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Campos Vacíos",
      text: "Por favor complete todos los campos obligatorios.",
    });
  };

  //MENSAJE DE ERROR
  const mostrarErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  };

  //VALIDACION DE LOS CAMPOS VACIOS
  const validarFormulario = () => {
    if (!form.email_cliente || !form.password_cliente) {
      mostrarCamposVaciosAlert();
      return false;
    }
    return true;
  };

  const guardarLogin = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    let nuevoPerfil = form;

    try {
      const request = await fetch(Global.url + "users/login", {
        method: "POST",
        body: JSON.stringify(nuevoPerfil),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await request.json();
      if (data.success === true) {
        //VEREFICO SI EL USUARIO EXISTE
        const usuarioExistente = localStorage.getItem("usuario");
        if (usuarioExistente) {
          localStorage.removeItem("usuario");
        }
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        console.log(data.usuario);

        //MENSAJE EXITOSO
        setGuardado("Guardado");
        Swal.fire({
          icon: "success",
          title: "Agregado",
          text: "Se ha agregado correctamente",
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          setnavLink(true);

          setTimeout(() => {
            window.location.reload();
          });
        });
      } else {
        //MENSAJE DE ERROR
        setGuardado("Error");
        mostrarErrorAlert(data.mensaje);
      }
    } catch (error) {
      //MENSAJE SI HAY PROBLEMA DEL SERVIDOR
      mostrarErrorAlert(
        "Algo salió mal. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

  if (navLink) {
    window.location.reload();
    return <Navigate to="/Inicio" />;
  }

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
      <Header />
      <h1>Agregar Producto</h1>
      <br />
      <br />
      <div className="container-flui">
        <div className="row">
          <div className="col-2">
                                   
                    <form action="">
                      {/* ... Otros campos de formulario ... */}
    
                      <div className="form-wrapper">
                        <label htmlFor="">Id del Producto</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-wrapper">
                        <label htmlFor="">Nombre Del Producto</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-wrapper">
                        <label htmlFor="">Descripcion</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-wrapper">
                        <label htmlFor="">Cantidad</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-wrapper">
                        <label htmlFor="">Precio</label>
                        <input type="number" className="form-control" />
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
    
                      <button type="button" className="btn btn-success">Agregar Productos</button>
                      <br />
                      <br />
                      <br />
                    </form>
                  
                
              </div></div>
          <div className="col-8">{/* Mostrar la vista previa de la imagen seleccionada */}
            {imagenPreview && (
              <img
                src={imagenPreview}
                alt="Vista previa de la imagen"
                style={{ width: "80%", height: "auto", maxHeight: "80%" }}
              />
            )}</div>
        </div>
      
     

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
                    <img src="images/product-1.jpg" />
                  </a>
                  <h3>  {producto.nombre_producto}</h3>
                  <hr />
                  <p> Descripcion Del Producto: {producto.descripcion_producto}</p>
                  
                  <hr />
                  <p > Precio del Producto: {producto.precio_producto}</p>
                  <hr />
                  <p >Cantidad del Producto: {producto.stock_producto}</p>
                 <button type="button" className="btn btn-danger" style={{margin:"5px"}}> <i className="bi bi-trash3-fill"  > </i> </button> 
             
                 <button type="button" className="btn btn-success"><i className="bi bi-pencil-square"></i></button>

                 
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
      <Footerr />
    </>
  );
};

export default AgregarProduct;
