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
  const usuario = localStorage.getItem("rol");
  let rol = JSON.parse(usuario)

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
          <div className="col-12">
            <br />
            <div className="cabecera">
              <img src={logo} alt="" style={{ maxWidth: "120px" }} />

            </div>
            <br />
          </div>
          <div className="col-12">
            <div className="navbarr">
              <nav>
                <ul id="MenuItems">

                  <a href="/inicio" >Home</a>

                  <a href="/carrito">carrito</a>


                  {rol[0].rol == 1 ? (
                    <>

                      <a href="/AgregarProduct">Agregar Producto</a>
                    </>
                  ) : (
                    " "
                  )}


                  <a href="/" onClick={cerrarSesion}
                    style={{ backgroundColor: "#636363" }}> Cerrar sesion</a>



                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Header;
