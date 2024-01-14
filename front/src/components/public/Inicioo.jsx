import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import Header from "../private/Header";
import Footerr from "../private/Footer";
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/image1.png";
const Inicio = () => {
  return (
    <>
       <div className="header">
        <div className="container">
            <div className="navbar">
                <div className="logo">
                    <a><img src={logo} alt="logoyy" width="125px"/></a>
                </div>
                <nav>
                    <ul id="MenuItems">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="products.html">Products</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Contact</a></li> 
                        <li><a href="account.html">Account</a></li>
                        <li><a href="account.html">Agregar Producto</a></li>
                    </ul>
                </nav>
                <a href="cart.html"><img src={user} width="30px" height="30px"/></a>
                <img src="images/menu.png" className="menu-icon" />
            </div>
            <div className="row">
                <div className="col-2">
                    <h1>Give Your Workout <br/> A New Style!</h1>
                   
                    <a href="" className="btn">Explore Now &#8594;</a>
                </div>
                <div className="col-2">
                    <img src={imgnav}/>
                </div>
            </div>
        </div>
    </div>

    

    <div className="categories">
        <div className="small-container">
            <div className="row">
                <div className="col-3">
                    <img src="images/category-1.jpg"/>
                </div>
                <div className="col-3">
                    <img src="images/category-2.jpg"/>
                </div>
                <div className="col-3">
                    <img src="images/category-3.jpg"/>
                </div>
            </div>
        </div>
    </div>

  

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
                </div>
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