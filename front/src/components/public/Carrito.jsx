import { NavLink } from "react-router-dom";

const Carrito = () => {
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

   
    <div className="small-container cart-page">
        <table>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
            </tr>
            <tr>
                <td>
                    <div className="cart-info">
                        <img src="images/buy-1.jpg"/>
                        <div>
                            <p>Red Printed T-Shirt</p>
                            <small>Price: $50.00</small>
                            <br/>
                            <a href="">Remove</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1"/></td>
                <td>$50.00</td>
            </tr>
            <tr>
                <td>
                    <div className="cart-info">
                        <img src="images/buy-2.jpg"/>
                        <div>
                            <p>Red Printed T-Shirt</p>
                            <small>Price: $50.00</small>
                            <br/>
                            <a href="">Remove</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1"/></td>
                <td>$50.00</td>
            </tr>
            <tr>
                <td>
                    <div className="cart-info">
                        <img src="images/buy-3.jpg"/>
                        <div>
                            <p>Red Printed T-Shirt</p>
                            <small>Price: $50.00</small>
                            <br/>
                            <a href="">Remove</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1"/></td>
                <td>$50.00</td>
            </tr>
        </table>
        <div className="total-price">
            <table>
                <tr>
                    <td>Subtotal</td>
                    <td>$200.00</td>
                </tr>
                <tr>
                    <td>Tax</td>
                    <td>$35.00</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>$230.00</td>
                </tr>
            </table>
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

export default Carrito;