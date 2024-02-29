import { NavLink } from "react-router-dom";
import img from "../../assets/img/bg-registration-form-2.jpg";
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/imgnav.webp";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";
const footer = () => {
  const { setAutenticado } = UseAuth();
  const { Autenticado } = UseAuth();

  //REDIRIGE
  console.log(Autenticado);
  //ALERTA PARA CERRAR SESION
  const navigate = useNavigate();
  const usuario = localStorage.getItem("rol");
  let rol = JSON.parse(usuario);

  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col-2">
              <img src={logo} />
              <p>
              Explore exclusive finds at our online store. Elevate your shopping experience with unique treasures. <br />Welcome to your go-to destination for style and more!
              </p>
            </div>
            <div className="footer-col-4">
              <h3>Enlaces Directos</h3>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Youtube</li>
                {rol[0].rol == 1 ? (
                    <>
                      <a href="/AgregarProduct">Agregar Producto</a>
                    </>
                  ) : (
                    " "
                  )}
              </ul>
            </div>
          </div>
          <hr />
          <p className="copyright" style={{ color: "white" }} >Copyright 2020 - Samwit Adhikary</p>
        </div>
      </div>
    </>
  );
};

export default footer;
