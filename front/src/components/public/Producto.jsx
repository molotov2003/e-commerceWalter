import { NavLink } from "react-router-dom";

const Producto = () => {
  return (
    <>
       <div className="container">
        <div className="navbar">
            <div className="logo">
                <a href="index.html"><img src="images/logo.png" alt="logo" width="125px"/></a>
            </div>
            <nav>
                <ul id="MenuItems">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="products.html">Products</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Contact</a></li>
                    <li><a href="account.html">Account</a></li>
                </ul>
            </nav>
            <a href="cart.html"><img src="images/cart.png" width="30px" height="30px"/></a>
            <img src="images/menu.png" className="menu-icon" />
        </div>
    </div>

   
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

   
    <div className="footer">
        <div className="container">
            <div className="row">
                <div className="footer-col-1">
                    <h3>Download Our App</h3>
                    <p>Download App for Android and ios mobile phone.</p>
                    <div className="app-logo">
                        <img src="images/play-store.png"/>
                        <img src="images/app-store.png"/>
                    </div>
                </div>
                <div className="footer-col-2">
                    <img src="images/logo-white.png"/>
                    <p>Our Purpose Is To Sustainably Make the Pleasure and Benefits of Sports Accessible to the Many.
                    </p>
                </div>
                <div className="footer-col-3">
                    <h3>Useful Links</h3>
                    <ul>
                        <li>Coupons</li>
                        <li>Blog Post</li>
                        <li>Return Policy</li>
                        <li>Join Affiliate</li>
                    </ul>
                </div>
                <div className="footer-col-4">
                    <h3>Follow Us</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                        <li>Youtube</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className="copyright">Copyright 2020 - Samwit Adhikary</p>
        </div>
    </div>
   
 
    </>
  );
};

export default Producto;