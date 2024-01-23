import { NavLink } from "react-router-dom";
import img from "../../assets/img/bg-registration-form-2.jpg";
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/image1.png";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";
import Swal from "sweetalert2";
const Header = () => {

  const { setAutenticado } = UseAuth();
  const { Autenticado } = UseAuth();
  

  //REDIRIGE
   console.log(Autenticado)
  //ALERTA PARA CERRAR SESION
  const navigate = useNavigate();

  //Cierro sesion
  const cerrarSesion = (event) => {
    console.log("entro");

    Swal.fire({
      title: "Estas seguro?",
      text: "Quieres salir de la pagina!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Salir!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("entro pedrito");
        Swal.fire("Sesion cerrada!", "Exitosamente.", "success");
        console.log("cerrar sesion");
        localStorage.removeItem("usuario");
        setAutenticado({});
        navigate("/");
      }
    });

  

  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div id="niko" className="col-12">
            <div className="header">
              <div className="navbar">
                <div className="logo">
                  <a>
                    <img src={logo} />
                  </a>
                </div>
                <nav>
                  <ul id="MenuItems">
                    <li>
                      <a href="/inicio">Home</a>
                    </li>
                    <li>
                      <a href="/carrito">carrito</a>
                    </li>
                    <li>
                      {Autenticado.rol[3] == 1 ? (
                        <>
                          {/* SECCION CARRITO DE COMPRAS */}
                          <Forms Autenticado={Autenticado} />
                          <a href="/AgregarProduct">Agregar Producto</a>
                        </>
                      ) : (
                        " "
                      )}
                     
                    </li>
                    <li>
                      <button
                        onClick={cerrarSesion}
                        style={{ backgroundColor: "black", color: "white" }}
                      >
                        Cerrar sesion
                      </button>
                    </li>
                  </ul>
                </nav>

                <img src="images/menu.png" className="menu-icon" />
              </div>
              <div className="row">
                <div className="col-2">
                  <h1>
                    Give Your Workout <br /> A New Style!
                  </h1>

                  <a href="" className="btn">
                    Explore Now &#8594;
                  </a>
                </div>
                <div className="col-2">
                  <img src={imgnav} />
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
