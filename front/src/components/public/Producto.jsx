import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import Header from "../private/Header";
import Footerr from "../private/Footer";
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/image1.png";

const Producto = () => {
  return (
    <>
     <Header/>

   
    <div className="small-container single-product">
        <div className="row">
            <div className="col-2">
                <img src="images/gallery-1.jpg" width="100%" id="ProductImg"/>

                <div className="small-img-row">
                    <div className="small-img-col">
                        <img src="images/gallery-1.jpg" width="100%" className="small-img"/>
                    </div>
                    <div className="small-img-col">
                        <img src="images/gallery-2.jpg" width="100%" className="small-img"/>
                    </div>
                    <div className="small-img-col">
                        <img src="images/gallery-3.jpg" width="100%" className="small-img"/>
                    </div>
                    <div className="small-img-col">
                        <img src="images/gallery-4.jpg" width="100%" className="small-img"/>
                    </div>
                </div>

            </div>
            <div className="col-2">
                <p>Home / T-Shirt</p>
                <h1>Red Printed T-Shirt by HRX</h1>
                <h4>$50.00</h4>
                <select>
                    <option>Select Size</option>
                    <option>XXL</option>
                    <option>XL</option>
                    <option>L</option>
                    <option>M</option>
                    <option>S</option>
                </select>
                <input type="number" value="1"/>
                <a href="" className="btn">Add To Cart</a>

                <h3>Product Details <i className="fa fa-indent"></i></h3>
                <br/>
                <p>Give your summer wardrobe a style upgrade with the HRX Mens Active T-Shirt. Team it with a pair of
                    shorts for your morning workout or a denims for an evening out with the guys.</p>
            </div>
        </div>
    </div>
    
    <div className="small-container">
        <div className="row row-2">
            <h2>Related Products</h2>
            <p>View More</p>
        </div>
    </div>
   
    <div className="small-container">
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

   <Footerr/>
   
 
    </>
  );
};

export default Producto;