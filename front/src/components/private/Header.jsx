import { NavLink } from "react-router-dom";
import img from "../../assets/img/bg-registration-form-2.jpg"
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/image1.png";

const Header = () => {
  return (
    <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
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
            </div>
        </div>
    </div>
       
    </>
  );
};

export default Header;