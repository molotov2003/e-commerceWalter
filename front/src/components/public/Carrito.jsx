import { NavLink } from "react-router-dom";
import React, { useState } from "react";
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

  //REDIRIGE
  console.log(Autenticado);
  //ALERTA PARA CERRAR SESION
  const navigate = useNavigate();
  const usuario = localStorage.getItem("productos");
  let productos = JSON.parse(usuario);
  console.log(productos[0].nombre);
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
                  <th style={{ color: "white" }}>Subtotal</th>
                </tr>

              

                {productos.length > 0 ? (
                  
                  productos.map((producto) => {
                    
                    return <>
                    <tr key={producto.id}>
                    <td>
                      <div className="cart-info">
                        <img src={"http://localhost:3900/" + producto.imagen} style={{ width: "200px", height: "auto" }} />
                        <div>
                          <h2 style={{ color: "#cfb658" }}>
                            {producto.nombre}
                          </h2>
                          <small style={{ color: "white" }}>
                            Precio: {producto.precio}
                          </small>
                          <br />
                          <a style={{ color: "white" }} href="">
                            Remove
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        min={1}
                        max={producto.cantidadMaxima}
                        style={{ width: "50px" }}
                        

                      />
                    </td>
                    <td style={{ color: "white" }}>$50.00</td>
                  </tr></>;
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
                    <td style={{ color: "white" }}>Subtotal</td>
                    <td style={{ color: "white" }}>$200.00</td>
                  </tr>
                  <tr>
                    <td style={{ color: "white" }}>Tax</td>
                    <td style={{ color: "white" }}>$35.00</td>
                  </tr>
                  <tr>
                    <td style={{ color: "white" }}>Total</td>
                    <td style={{ color: "white" }}>$230.00</td>
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
                      <i className="bi bi-bag"></i> Añadir al carrito
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
