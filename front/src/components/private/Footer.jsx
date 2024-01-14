import { NavLink } from "react-router-dom";
import img from "../../assets/img/bg-registration-form-2.jpg"
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/imgnav.webp";

const footer = () => {
  return (
    <>
       <div className="footer">
        <div className="container">
            <div className="row">
                
                <div className="footer-col-2">
                    <img src={logo}/>
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

export default footer;