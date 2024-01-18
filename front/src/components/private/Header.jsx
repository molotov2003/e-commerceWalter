import { NavLink } from "react-router-dom";
import img from "../../assets/img/bg-registration-form-2.jpg";
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/image1.png";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  //Cierro sesion
  const cerrarSesion = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "3") {
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
          Swal.fire("Sesion cerrada!", "Exitosamente.", "success");
          console.log("cerrar sesion");
          localStorage.clear();
          setAutenticado({});
          navigate("/");
        }
      });
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div id="niko" className="col-12">
            <div className="header">
              <div className="navbar">
                <div className="logo">
                  <a>
                    <img src={logo} alt="logo" width="125px" />
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
                      <a onClick={cerrarSesion} href="/">Cerrar sesion</a>
                    </li>

                    <li>
                      <a href="/AgregarProduct">Agregar Producto</a>
                    </li>
                  </ul>
                </nav>
               
                <img src="images/menu.png" className="menu-icon" />
              </div>
              <div className="row">
                <div className="col-2">
                  <h1 >
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
