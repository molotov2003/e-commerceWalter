import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import Header from "../private/Header";
import Footerr from "../private/Footer";
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/image1.png";
const Carrito = () => {
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

                <tr>
                  <td>
                    <div className="cart-info">
                      <img src="images/buy-1.jpg" />
                      <div>
                        <p style={{ color: "white" }}>Red Printed T-Shirt</p>
                        <small style={{ color: "white" }}>Price: $50.00</small>
                        <br />
                        <a style={{ color: "white" }} href="">
                          Remove
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <input type="number" value="1" />
                  </td>
                  <td style={{ color: "white" }}>$50.00</td>
                </tr>
                <tr>
                  <td>
                    <div className="cart-info">
                      <img src="images/buy-2.jpg" />
                      <div>
                        <p style={{ color: "white" }}>Red Printed T-Shirt</p>
                        <small style={{ color: "white" }}>Price: $50.00</small>
                        <br />
                        <a style={{ color: "white" }} href="">
                          Remove
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <input type="number" value="1" />
                  </td>
                  <td style={{ color: "white" }}>$50.00</td>
                </tr>
                <tr>
                  <td>
                    <div className="cart-info">
                      <img src="images/buy-3.jpg" />
                      <div>
                        <p style={{ color: "white" }}>Red Printed T-Shirt</p>
                        <small style={{ color: "white" }}>Price: $50.00</small>
                        <br />
                        <a style={{ color: "white" }} href="">
                          Remove
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <input type="number" value="1" />
                  </td>
                  <td style={{ color: "white" }}>$50.00</td>
                </tr>
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
                        marginLeft:"50%"
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
