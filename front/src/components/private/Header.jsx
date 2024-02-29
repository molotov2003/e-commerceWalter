import { NavLink } from "react-router-dom";
import img from "../../assets/img/bg-registration-form-2.jpg";
import logobav from "../../assets/img/hero-bg.jpg";
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
 
  //ALERTA PARA CERRAR SESION
  const navigate = useNavigate();
  const usuario = localStorage.getItem("rol");
  let rol = JSON.parse(usuario);

  //Cierro sesion
  const cerrarSesion = (event) => {
   

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
    <div className="container-fluid" style={{ position: 'fixed', width: '100%', zIndex: '1000' }}>
  <div className="row">
    <div className="col-12">
      <div className="navbarr">
        <nav>
          <ul id="MenuItems">
            <a href="/inicio">Inicio</a>
            <a href="/carrito">Sobre Nosotros</a>
            <img src={logo} alt="" style={{ maxWidth: "100px" }} />
            <a href="/carrito">carrito</a>
            <a href="/" onClick={cerrarSesion} style={{ backgroundColor: "black" }}>
              Cerrar sesion
            </a>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</div>

<div className="container-fluid">
  <div id="hero" className="hero route bg-image">
    <div className="overlay-itro"></div>
    <div className="hero-content display-table">
      <div className="table-cell">
        <div className="container">
          <div className="row no-gutters">
            <div className="" style={{ marginTop: "350px", marginLeft:"50%" }}>
              {/* Ajusté la posición del texto para que esté más abajo */}
              <h1>Experiencia unica En Urban Pulse Store</h1>
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
