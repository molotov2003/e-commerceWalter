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
import jordan from "../../assets/img/jordan.jpg";

const AgregarProduct = () => {
  // Estado para almacenar la URL de la imagen seleccionada
  const [imagenPreview, setImagenPreview] = useState(null);
  //CREAMOS ESTADOS PARA TRAER TODOS LOS ESTUDIOS


  const [estado, setEstado] = useState(null);
  const [productos, setProductos] = useState(null);

  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState();
  
 

  // Resto del código...
  //REDIRECCIONA

  const { form, cambiar } = HelperForm({});
  const [, setGuardado] = useState("");
  const [navLink, setnavLink] = useState(false);


  const mostrarErrorAlert = (message) => {
    Swal.fire({
      icon: "success",
      title: "Felicidades",
      text: message,
    });
  };

 
  //////manejo la direccion del sitio

  if (navLink) {
    window.location.reload();
    return <Navigate to="/Inicio" />;
  }

//////////////////// Agregar Categoria ///////////////////////////
const guardarCategoria = async (e) => {
  e.preventDefault();
  
  let nuevoPerfil = { ...form, id_cliente:parseInt(form.id_cliente) };
  console.log(nuevoPerfil);
  try {
    const response = await fetch(Global.url + "categorias/insertarCategoria", {
      method: "POST",
      body: JSON.stringify(nuevoPerfil),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  console.log(data);
    if (data.success === true) {
      //MENSAJE EXITOSO
      setGuardado("Guardado");
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "¡Tu registro se ha completado con éxito!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
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

  //////////////////////////////////Agregar Productos
  const guardarCards = async (e) => {
    e.preventDefault();

    
    let nuevoProducto = { ...form, idCategoria: categoriaSeleccionada };
    console.log(nuevoProducto);
    try {
      const request = await fetch(Global.url + "products/insertarProducto", {
        method: "POST",
        body: JSON.stringify(nuevoProducto),
        headers: {
          
          "Content-Type": "application/json",
        },
      });
      const data = await request.json();
      if (data.status === true) {
        //MENSAJE EXITOSO
        console.log(data);
        setGuardado("Guardado");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tu Card ha sido guardada!!",
          showConfirmButton: false,
          timer: 1500,
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

///////////////////////////////// cargar estudios 
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

  
  const traerCategorias = async () => {
    try {
      const response = await fetch(
        Global.url + "categorias/listarCategorias",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener categorías");
      }
      const data = await response.json();
      setCategorias(data.categorias);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  useEffect(() => {
    traerCategorias();
    cargarEstudio();
    
  }, []);


  return (
    <>
      <Header />
      <br />
      <br />
      
      
      <div
        className="col-12"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          margin: 0,
        }}
      >
        
        <form className="custom-form hero-form"
        action="#"
        method="get"
        role="form"
        onSubmit={guardarCards}>
          {/* ... Otros campos de formulario ... */}

          <h2>Agregar Producto</h2>
          <hr />
          
          <div className="form-wrapper">
            <label htmlFor="">Id del Producto</label>
            <input type="text" className="form-control"
                name="producto_id"
                id="producto_id"
               
                
                onChange={cambiar}
                required/>
          </div>
          <div className="form-wrapper">
            <label htmlFor="">Nombre Del Producto</label>
            <input  className="form-control"type="text"
                name="nombre_producto"
                id="nombre_producto"
               
                
                onChange={cambiar}
                required/> 
          </div>
          <div className="form-wrapper">
            <label htmlFor="">Descripcion</label>
            <input  className="form-control"type="text"
                name="descripcion_producto"
                id="descripcion_producto"         
                onChange={cambiar}
                required />
          </div>
          <div className="form-wrapper">
            <label htmlFor="">Precio</label>
            <input className="form-control"type="text"
                name="precio_producto"
                id="precio_producto"         
                onChange={cambiar}
                required />
          </div>
          <div className="form-wrapper">
            <label htmlFor="">Cantidad</label>
            <input className="form-control"type="text"
                name="stock_producto"
                id="stock_producto"         
                onChange={cambiar}
                required />
          </div>
          <div className="form-wrapper">
          <select
              className="form-control"
              name="Categoria_idCategoria"
              aria-label="Default select example"
      
            >
              <option selected>Selecciona una Categoria</option>              
                <option>
                  nada
                </option>
             
            </select> 
          </div>

          <div className="form-wrapper">
            <label htmlFor="">Imagen</label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={cambiar}
            />
          </div>

          {/* Resto del formulario... */}

          <button type="submit" className="btn btn-success">
            Agregar Productos
          </button>
          <br />
          <br />
          <br />
        </form>
        

        <form className="custom-form hero-form"
        action="#"
        method="Post"
        role="form"
        onSubmit={guardarCategoria}>
          {/* ... Otros campos de formulario ... */}

          <h2>Agregar Categoria</h2>
          <hr />
          <div className="form-wrapper">
            <label htmlFor="">Id del Producto</label>
            <input type="text" className="form-control"
                name="categoria_id"
                id="categoria_id"
               
                
                onChange={cambiar}
                required/>
          </div>
          <div className="form-wrapper">
            <label htmlFor="">Nombre De la Categoria</label>
            <input  className="form-control"type="text"
                name="nombre_categoria"
                id="nombre_categoria"                
                onChange={cambiar}
                required/> 
          </div>
          
      
          

          {/* Resto del formulario... */}

          <button type="submit" className="btn btn-success">
            Agregar Productos
          </button>
          <br />
          <br />
          <br />
        </form>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-10">
            <div className="small-container">
              <h2 className="title">Productos</h2>

              <div className="row">
            {/* <select
              className="form-control"
              name="Categoria_idCategoria"
              aria-label="Default select example"
      
            >
              <option selected>Selecciona una Categorias</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.nombre_categoria}
                  value={categoria.categoria_id}
                >
                  {categoria.nombre_categoria}
                </option>
              ))}
            </select> */}
                
                <hr />
                {estado == true ? (
                  productos.map((producto) => {
                    return (
                      <>
                        <div className="col-3" key={producto.producto_id}>
                          <a href="product_details.html">
                            <img src={jordan} />
                          </a>
                          <h3> {producto.nombre_producto}</h3>
                          <hr />
                          <p>
                            {" "}
                            Descripcion Del Producto:{" "}
                            {producto.descripcion_producto}
                          </p>

                          <hr />
                          <p>
                            {" "}
                            Precio del Producto: {producto.precio_producto}
                          </p>
                          <hr />
                          <p>
                            Cantidad del Producto: {producto.stock_producto}
                          </p>
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ margin: "5px" }}
                          >
                            {" "}
                            <i className="bi bi-trash3-fill"> </i>{" "}
                          </button>

                          <button type="button" className="btn btn-success">
                            <i className="bi bi-pencil-square"></i>
                          </button>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <>
                    <h3 className="text-center">
                      Lo siento Por ahora no hay cards 😅
                    </h3>
                    <p className="text-center">
                      Se actualizara automaticamente la pagina al momento de
                      agregar una.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
<br />
<b></b>
      </div>
      <Footerr />
    </>
  );
};

export default AgregarProduct;
