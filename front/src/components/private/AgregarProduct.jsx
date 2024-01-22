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
  
  const usuario = localStorage.getItem("usuario");
  const userObj = JSON.parse(usuario);

  // genero el state para manipular el response del controlador
  const [estado, setEstado] = useState(null);
  // hago el state para los productos
  const [productos, setProductos] = useState(null);
  // Hago el state para los usuarios
  const [usuarios, setusuarios] = useState(null);
  // Hago el state para las categorias
  const [categorias, setCategorias] = useState([]);

  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoriaa, setCategoriass] = useState("");
  const [imagen, setImagen] = useState(null);
  // Resto del código...
  //REDIRECCIONA

  const { form, cambiar } = HelperForm({});
  const [, setGuardado] = useState("");
  const [navLink, setnavLink] = useState(false);

  const mostrarErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Que mal",
      text: message,
    });
  };

  const mostrarAlert = (message) => {
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
  ///////////////////// Editar producto
  const editarProducto = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("producto_id", id);
    formData.append("nombre_producto", nombre);
    formData.append("descripcion_producto", descripcion);
    formData.append("precio_producto", precio);
    formData.append("stock_producto", stock);
    formData.append("img", imagen);
    formData.append("id_categoria", categoriaa);

    console.log(formData);
    try {
      const request = await fetch(Global.url + "products/actualizarProducto", {
        method: "POST",
        body: formData,
      });
      console.log(request);
      const data = await request.json();

      if (data.status === true) {
        // MENSAJE EXITOSO
        console.log(data);
        setGuardado("Guardado");

        mostrarAlert(data.mensaje);
        window.location.reload();
        return <Navigate to="/AgregarProduct" />;
      } else {
        // MENSAJE DE ERROR
        setGuardado("Error");
        mostrarErrorAlert(data.mensaje);
      }
    } catch (error) {
      // MENSAJE SI HAY PROBLEMA DEL SERVIDOR
      mostrarErrorAlert(
        "Algo salió mal. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

  //////////////////// Agregar Categoria ///////////////////////////
  const guardarCategoria = async (e) => {
    e.preventDefault();

    let nuevoPerfil = { ...form, id_cliente: parseInt(form.id_cliente) };
    console.log(nuevoPerfil);
    try {
      const response = await fetch(
        Global.url + "categorias/insertarCategoria",
        {
          method: "POST",
          body: JSON.stringify(nuevoPerfil),
          headers: {
            Authorization: userObj,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.response === true) {
        //MENSAJE EXITOSO
        setGuardado("Guardado");
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "¡Tu registro se ha completado con éxito!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {});
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  
  };

  
  //////////////////////////////////Agregar Productos

  const guardarCards = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("producto_id", id);
    formData.append("nombre_producto", nombre);
    formData.append("descripcion_producto", descripcion);
    formData.append("precio_producto", precio);
    formData.append("stock_producto", stock);
    formData.append("img", imagen);
    formData.append("id_categoria", categoriaa);

    console.log(formData);
    try {
      const request = await fetch(Global.url + "products/insertarProducto", {
        method: "POST",
        body: formData,
        headers:{
          Authorization: userObj        
        },      
      });
     
      console.log(userObj)
      const data = await request.json();

      if (data.status == 200) {
        // MENSAJE EXITOSO
        console.log(data);
        setGuardado("Guardado");
        mostrarAlert("Se ha agregado correctamente");
      
      } else {
         // MENSAJE EXITOSO
         console.log(data);
         setGuardado("Guardado");
         mostrarAlert("Se ha agregado correctamente");
        
      }
    } catch (error) {
      // MENSAJE SI HAY PROBLEMA DEL SERVIDOR
      mostrarErrorAlert(
        "Algo salió mal. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

  ///////////////////////////////// Listar los productos
  const cargarEstudio = async () => {
    fetch(Global.url + "products/listarProductos", {
      method: "GET",
      headers: {
        Authorization: userObj 
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductos(data.productos);
        setEstado(data.status);
        console.log("products",data.productos);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };

  ///////////////////////////////// Eliminar productos
  const EliminarProducto = async (producto_id) => {
    console.log(producto_id);
    fetch(Global.url + "products/eliminarProducto/" + producto_id, {
      method: "DELETE",
      headers: {
       Authorization: userObj
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductos(data.productos);
        mostrarAlert("Se ha eliminado correctamente");
        window.location.reload();
        return <Navigate to="/AgregarProduct" />;
      })
      .catch((error) => {
        mostrarErrorAlert(
          "Algo salió mal. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };
  /////////////////// Listar las categorias
  const traerCategorias = async () => {
    try {
      const response = await fetch(Global.url + "categorias/listarCategorias", {
        method: "GET",
        headers: {
          Authorization: userObj
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener categorías");
      }
      const data = await response.json();
      if (data.status === true) {
        console.log(data.categorias);
        setCategorias(data.categorias);
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  ///traigo los producto filtados por la categoria
  const cargoproductofiltrado = async (producto_id) => {
    
    console.log(producto_id);
    // Limpia la variable de productos
    setProductos([]);

    fetch(Global.url + "products/listarporCategoria/"+producto_id, {
      method: "GET",
      headers: {
        Authorization: userObj      
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductos(data.productos);
        setEstado(data.status);
        console.log("el listado ",data.productos);  
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };

  /// Eliminar Categorias
  const EliminarCategoria = async (categoria_id) => {
    fetch(Global.url + "categorias/eliminarCategoria/" + categoria_id, {
      method: "DELETE",
      headers: {
        Authorization: userObj
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductos(data.productos);

        window.location.reload();
        return <Navigate to="/AgregarProduct" />;
      })
      .catch((error) => {
        mostrarErrorAlert(
          "Algo salió mal. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  /////////////////// Listar los usuarios ///////////////////////
  const traerusuarios = async () => {
    try {
      const response = await fetch(Global.url + "users/listarusuarios", {
        method: "GET",
        headers: {
          Authorization: userObj        
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener usuarios");
      }
      const data = await response.json();
      if (data.status === true) {
        console.log(data.usuarios);
        setusuarios(data.usuarios);
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  /////////////// Eliminar Usuario //////////////////
  const EliminarUsuario = async (id_cliente) => {
    fetch(Global.url + "users/eliminarUsuario/" + id_cliente, {
      method: "DELETE",
      headers: {
        Authorization: userObj
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductos(data.productos);

        window.location.reload();
        return <Navigate to="/AgregarProduct" />;
      })
      .catch((error) => {
        mostrarErrorAlert(
          "Algo salió mal. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  useEffect(() => {
    traerCategorias();
    cargarEstudio();
    traerusuarios();
    cargoproductofiltrado()
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
        <form
          className="custom-form hero-form"
          action="#"
          method="get"
          role="form"
          onSubmit={guardarCards}
          encType="multipart/form-data"
        >
          {/* ... Otros campos de formulario ... */}

          <h2>Agregar Producto</h2>
          <hr />

          <div className="form-wrapper">
            <label htmlFor="">Id del Producto</label>
            <input
              type="number"
              className="form-control"
              name="producto_id"
              id="producto_id"
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="">Nombre Del Producto</label>
            <input
              className="form-control"
              type="text"
              name="nombre_producto"
              id="nombre_producto"
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="">Descripcion</label>
            <input
              className="form-control"
              type="text"
              name="descripcion_producto"
              id="descripcion_producto"
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="">Precio</label>
            <input
              className="form-control"
              type="text"
              name="precio_producto"
              id="precio_producto"
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="">Cantidad</label>
            <input
              className="form-control"
              type="text"
              name="stock_producto"
              id="stock_producto"
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="">Agregar Categoria</label>
            <select
              onChange={(e) => setCategoriass(e.target.value)}
              className="form-control"
              name="Categoria_idCategoria"
              aria-label="Default select example"
            >
              <option selected>Selecciona una Categorias</option>

              {categorias.map((categoria) => (
                <option
                  key={categoria.categoria_id}
                  value={categoria.categoria_id}
                  name="id_categoria"
                  id="id_categoria"
                >
                  {categoria.nombre_categoria}
                </option>
              ))}
            </select>
          </div>

          <div className="form-wrapper">
            <label htmlFor="">Imagen</label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleImageChange}
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

        <form
          className="custom-form hero-form"
          action="#"
          method="Post"
          role="form"
          onSubmit={guardarCategoria}
        >
          {/* ... Otros campos de formulario ... */}

          <h2>Agregar Categoria</h2>
          <hr />
          <div className="form-wrapper">
            <label htmlFor="">Id del Producto</label>
            <input
              type="number"
              className="form-control"
              name="categoria_id"
              id="categoria_id"
              onChange={cambiar}
              required
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="">Nombre De la Categoria</label>
            <input
              className="form-control"
              type="text"
              name="nombre_categoria"
              id="nombre_categoria"
              onChange={cambiar}
              required
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
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Editar Producto
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
             
                <form
                  className="custom-form hero-form"
                  action="#"
                  method="get"
                  role="form"
                  onSubmit={editarProducto}
                
                  encType="multipart/form-data"
                >
                  {/* ... Otros campos de formulario ... */}

                  <div className="form-wrapper">
                    <label htmlFor="">Id del Producto</label>
                    <input
                      type="text"
                      className="form-control"
                      name="producto_id"
                      id="producto_id"
                      placeholder={(e) => setNombre(e.target.value)}
                      onChange={(e) => setId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="">Nombre Del Producto</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre_producto"
                      id="nombre_producto"
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="">Descripcion</label>
                    <input
                      className="form-control"
                      type="text"
                      name="descripcion_producto"
                      id="descripcion_producto"
                      onChange={(e) => setDescripcion(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="">Precio</label>
                    <input
                      className="form-control"
                      type="text"
                      name="precio_producto"
                      id="precio_producto"
                      onChange={(e) => setPrecio(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="">Cantidad</label>
                    <input
                      className="form-control"
                      type="text"
                      name="stock_producto"
                      id="stock_producto"
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="">Agregar Categoria</label>
                    <select
                      onChange={(e) => setCategoriass(e.target.value)}
                      className="form-control"
                      name="Categoria_idCategoria"
                      aria-label="Default select example"
                    >
                      <option selected>Selecciona una Categorias</option>

                      {categorias.map((categoria) => (
                        <option
                          key={categoria.categoria_id}
                          value={categoria.categoria_id}
                          name="id_categoria"
                          id="id_categoria"
                        >
                          {categoria.nombre_categoria}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-wrapper">
                    <label htmlFor="">Imagen</label>
                    <input
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  {/* Resto del formulario... */}

                  <button type="submit" className="btn btn-success">
                    Editar Producto
                  </button>
                  <br />
                  
                </form>
              
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-10">
            <div className="small-container">
              <h2 className="title">Productos</h2>

              <div className="row">
              <select
                  className="form-control"
                  name="producto_id"
                  id="producto_id"
                  aria-label="Default select example"
                  value={opcionSeleccionada}
                  onChange={(event) => cargoproductofiltrado(event.target.value)}
                >
                  <option selected> Selecciona una Categorias</option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.categoria_id}
                      value={categoria.categoria_id}
                    >
                      {categoria.nombre_categoria}
                    </option>
                  ))}
                </select>

                <hr />
                {estado == true ? (
                  productos.map((producto) => {
                    return (
                      <>
                        <div className="col-3" key={producto.producto_id}>
                          <div
                            className="id_producto"
                            id="id_producto"
                            value={producto.producto_id}
                          ></div>
                          <a href="product_details.html">
                            <img src={"http://localhost:3900/"+producto.img} />  
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
                            onClick={() =>
                              EliminarProducto(producto.producto_id)
                            }
                          >
                            {" "}
                            <i className="bi bi-trash3-fill"> </i>{" "}
                          </button>

                          <button
                            type="button"
                            className="btn btn-success"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
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
<br />
        <h1>Categorias</h1>
        <br />

        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID Categoria</th>
              <th scope="col">Nombre Categoria</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.categoria_id}>
                <th scope="row"> {categoria.categoria_id} </th>
                <td>{categoria.nombre_categoria}</td>
                <td>
                  {" "}
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ margin: "5px" }}
                    onClick={() => EliminarCategoria(categoria.categoria_id)}
                  >
                    {" "}
                    <i className="bi bi-trash3-fill"> </i>{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
        <h1>usuarios</h1>
        <br />
        {usuarios ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID Cliente</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Direccion</th>
                <th scope="col">rol</th>
                <th scope="col">Estado</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => {
                return (
                  <tr key={usuario.id_cliente}>
                    <td scope="row"> {usuario.id_cliente} </td>
                    <td scope="row"> {usuario.nombre_cliente} </td>
                    <td scope="row"> {usuario.email_cliente} </td>
                    <td scope="row"> {usuario.direccion_cliente} </td>
                    <td scope="row"> {usuario.rol} </td>
                    <td scope="row"> {usuario.estado} </td>
                    <td>
                      {" "}
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ margin: "5px" }}
                        onClick={() => EliminarUsuario(usuario.id_cliente)}
                      >
                        {" "}
                        <i className="bi bi-trash3-fill"> </i>{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Cargando usuarios...</p>
        )}
        <br />
      </div>
      <Footerr />
    </>
  );
};

export default AgregarProduct;
