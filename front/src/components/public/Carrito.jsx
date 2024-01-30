import { NavLink } from "react-router-dom";
import React, { useState,useEffect } from "react";
import Header from "../private/Header";
import Footerr from "../private/Footer";
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/image1.png";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";

const Carrito = () => {
  const { setAutenticado } = UseAuth();
  const { Autenticado } = UseAuth();

  const [productosCarrito, setProductosCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  
  const verCarro = () => {
    const productosGuardados =
      JSON.parse(localStorage.getItem("productos")) || [];
    setProductosCarrito(productosGuardados);
    let total2 = productosGuardados.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
    setTotal(total2);
    console.log(total2);
     
    localStorage.setItem("total", total2);
    console.log(total)
  };

  const formatearPrecio = (precio) => {
    // Convierte la cadena a un número con parseFloat
    const precioNumerico = parseFloat(precio);
  
    // Verifica si el resultado es un número válido
    if (!isNaN(precioNumerico)) {
      return precioNumerico.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      // Manejar el caso en que precio no sea un número
      return "Precio no válido";
    }
  };

  

  //ALERTA PARA CERRAR SESION
  const navigate = useNavigate();
  const usuario = localStorage.getItem("productos");
  let productos = JSON.parse(usuario);

   


  const handleEliminarDelLocalStorage = (productoId) => {
    // Obtener la lista de productos desde el localStorage
    const productosGuardados =
      JSON.parse(localStorage.getItem("productos")) || [];

    // Filtrar la lista para excluir el producto con el ID específico
    const nuevaLista = productosGuardados.filter(
      (producto) => producto.id !== productoId
    );
    //console.log(nuevaLista);
    // Actualizar el localStorage con la nueva lista
    localStorage.setItem("productos", JSON.stringify(nuevaLista));

    // Actualizar el estado del componente con la nueva lista
    setProductosCarrito([]);
    setProductosCarrito(nuevaLista);

  };


  const handleActualizarCantidad = (id, nuevaCantidad) => {
    verCarro();
    const nuevoCarrito = productosCarrito
      .map((producto) => {
        if (producto.id === id) {
          const cantidadMaxima = producto.cantidadMaxima;
          // Asegurarse de que la nueva cantidad no supere la cantidad máxima
          const cantidadActualizada = Math.min(nuevaCantidad, cantidadMaxima);
          if (cantidadActualizada > 0 && producto.precio > 0) {
            return {
              ...producto,
              cantidad: cantidadActualizada,
              total: cantidadActualizada * producto.precio,
            };
          } else {
            return null;
          }
        }
        return producto;
      })
      .filter(Boolean);

      console.log("gog",total)
    localStorage.setItem("productos", JSON.stringify(nuevoCarrito));
    setProductosCarrito(nuevoCarrito);
    verCarro();
  };

 

  useEffect(() => {
    verCarro();
  }, []);
  
  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row">
          <div className="col-9">
            <div className="small-container cart-page">
              <table>
                <tr>
                  <th style={{ color: "white" }}>Product</th>
                  <th style={{ color: "white" }}>Quantity</th>
                </tr>

                {productos.length > 0 ? (
                  productos.map((producto) => {
                    return (
                      <>
                        <tr key={producto.id}>
                          <td>
                            <div className="cart-info">
                              <img
                                src={"http://localhost:3900/" + producto.imagen}
                                style={{ width: "200px", height: "auto" }}
                              />
                              <div>
                                <h2 style={{ color: "#cfb658" }}>
                                  {producto.nombre}
                                </h2>
                                <small style={{ color: "white" }}>
                                  Precio: ${formatearPrecio(producto.precio)}
                                  
                                </small>
                                <br />
                                <a
                                  style={{
                                    backgroundColor: "#cfb658",
                                    color: "#fff",
                                    padding: "5px 9px",
                                    borderRadius: "4px",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "block",
                                    margin: "10px auto",
                                    marginLeft: "50%",
                                  }}
                                  onClick={() => {
                                    handleEliminarDelLocalStorage(producto.id);
                                  }}
                                  href="/carrito"
                                >
                                  Eliminar
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <input
                              type="number"
                                  value={producto.cantidad}
                                  onChange={(e) =>
                                    handleActualizarCantidad(
                                      producto.id,
                                      e.target.value
                                    )
                                  }
                              min={1}
                              max={producto.cantidadMaxima}
                              style={{ width: "50px" }}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <>
                    <h1>No hay productos</h1>
                  </>
                )}
              </table>
              <div className="total-price">
                <table>
                  <tr>
                    <td style={{ color: "white" }}>Tax</td>
                    <td style={{ color: "white" }}>$0</td>
                  </tr>
                  <tr>
                    <td style={{ color: "white" }}>Total</td>
                    <td style={{ color: "white" }}>{total}</td>
                  </tr>
                  <tr>
                    <td style={{ color: "white" }}>Comprar</td>
                    <button
                      type="button"
                      style={{
                        backgroundColor: "#cfb658",
                        color: "#fff",
                        padding: "5px 9px",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer",
                        display: "block",
                        margin: "10px auto",
                        marginLeft: "50%",
                      }}
                    >
                      <i className="bi bi-bag"></i>{" "}
                      <a href="Producto"> Comprar</a>
                    </button>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footerr />
    </>
  );
};

export default Carrito;
