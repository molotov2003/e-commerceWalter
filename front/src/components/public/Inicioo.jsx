import { useEffect, useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import { Navigate, NavLink } from "react-router-dom";

import Header from "../private/Header";
import Footerr from "../private/Footer";
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/image1.png";
import jordan from "../../assets/img/jordan.jpg";

const Inicio = () => {
  // Estado para almacenar la URL de la imagen seleccionada
  const usuario = localStorage.getItem("usuario");
  const userObj = JSON.parse(usuario);
  //CREAMOS ESTADOS PARA TRAER TODOS LOS ESTUDIOS
  const [estado, setEstado] = useState(null);
  const [productos, setProductos] = useState(null);
  ///////////
  const [categorias, setCategorias] = useState([]);
  //////////
  const [estadoca, setEstadoca] = useState(null);
  const [categoriasfil, setCategoriasfil] = useState([]);

  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

  //TRAE TODOS LOS ESTUDIOS
  const cargarEstudio = async () => {
    fetch(Global.url + "products/listarProductos", {
      method: "GET",
      headers: {
        Authorization: userObj,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductos(data.productos);
        setEstado(data.status);
        console.log("products", data.productos);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };

  ///traigo los producto filtados por la categoria
  const cargoproductofiltrado = async (producto_id) => {
    console.log(producto_id);
    // Limpia la variable de productos
    setProductos([]);

    fetch(Global.url + "products/listarporCategoria/" + producto_id, {
      method: "GET",
      headers: {
        Authorization: userObj,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductos(data.productos);
        setEstado(data.status);
        console.log("el listado ", data.productos);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };
  /////////////////// Listar las categorias
  const traerCategorias = async () => {
    try {
      const response = await fetch(Global.url + "categorias/listarCategorias", {
        method: "GET",
        headers: {
          Authorization: userObj,
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

  //Verifico si ya esta en la local storage
  const [productosEnLocalStorage, setProductosEnLocalStorage] = useState(
    JSON.parse(localStorage.getItem("productos")) || []
  );

  // Agrego el  producto a el carrito
  const productoEnLocalStorage2 = (producto) => {
    const productosGuardados =
      JSON.parse(localStorage.getItem("productos")) || [];

    // Verificar si el producto está presente en la lista de productos en localStorage
    return productosGuardados.some((p) => p.id === producto.idProducto);
  };

  const handleClick = (producto) => {
    if (productoEnLocalStorage2(producto)) {
      MySwal.fire({
        title: <strong> {"Error"}</strong>,
        html: <i>{"El Producto Ya Esta En El Carrito"}</i>,
        icon: "error",
      });
    } else {
      let nuevosProductos = JSON.parse(localStorage.getItem("productos")) || [];
      let nuevoTotal = producto.Precio * 1;
      // Actualizar la lista de productos con el nuevo producto
      const nuevaLista = [
        ...nuevosProductos,
        {
          imagen: producto.img,
          nombre: producto.nombre_producto,
          id: producto.producto_id,
          precio: producto.precio_producto,
          cantidad: 1,
          cantidadMaxima: producto.stock_producto,
          total: nuevoTotal,
        },
      ];
      setProductosEnLocalStorage([]);
      localStorage.setItem("productos", JSON.stringify(nuevaLista));
      setProductosEnLocalStorage(nuevaLista);

      // Guardar la lista de productos en el localStorage
      localStorage.setItem("productos", JSON.stringify(nuevaLista));
      MySwal.fire({
        title: <strong> {"Felicitaciones"}</strong>,
        html: <i>{"Productos Agregado Al Carrito Correctamente"}</i>,
        icon: "success",
      });
    }
  };

  useEffect(() => {
    traerCategorias();
    cargarEstudio();
    cargoproductofiltrado();
  }, []);
  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row">
          <div className="col-10">
            <br />
            <div className="small-container">
              <h2 className="title" style={{ color: "white" }}>
                Productos
              </h2>
              <select
                className="form-control"
                name="producto_id"
                id="producto_id"
                aria-label="Default select example"
                value={opcionSeleccionada}
                onChange={(event) => cargoproductofiltrado(event.target.value)}
                style={{ backgroundColor: "#827D55", color: "white" }}
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
              <br />
              <div className="row">
                {estado == true ? (
                  productos.map((producto) => {
                    return (
                      <>
                        <div
                          className="col-3"
                          style={{
                            flex: "0 0 400px",
                            border: "0.5px solid #cfb658",
                            borderRadius: "1px",
                          }}
                          key={producto.producto_id}
                        >
                          <a href="product_details.html">
                            <img
                              src={"http://localhost:3900/" + producto.img}
                              style={{ maxWidth: "100%", height: "300px" }}
                            />
                          </a>
                          <h3 style={{ color: "#cfb658", textAlign: "center" }}>
                            {" "}
                            {producto.nombre_producto}
                          </h3>

                          <hr
                            style={{
                              borderTop: "1px solid #cfb658",
                              width: "50%",
                              margin: "10px auto",
                            }}
                          />
                          <p >
                            {" "}
                            Descripcion Del Producto:{" "}
                            {producto.descripcion_producto}
                          </p>

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
                            style={{
                              backgroundColor: "#cfb658",
                              color: "#fff",
                              padding: "10px 15px",
                              borderRadius: "4px",
                              border: "none",
                              cursor: "pointer",
                              display: "block",
                              margin: "10px auto",
                            }}
                            onClick={() => {
                              handleClick(producto);
                            }}
                          >
                            <i className="bi bi-bag"></i> Añadir al carrito
                          </button>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <>
                    <h3 className="text-center">
                      Lo siento Por ahora no hay productos disponibles
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
      </div>
      <hr />
      <Footerr />
    </>
  );
};

export default Inicio;
