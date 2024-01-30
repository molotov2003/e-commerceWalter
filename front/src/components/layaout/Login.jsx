import { useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import { Navigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

import img from "../../assets/img/logo1.png";

const Login = () => {
  //REDIRECCIONA

  const { form, cambiar } = HelperForm({});
  const [, setGuardado] = useState("");
  const [navLink, setnavLink] = useState(false);

  //MENSAJE DE LOS CAMPOS VACIOS
  const mostrarCamposVaciosAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Campos Vacíos",
      text: "Por favor complete todos los campos obligatorios.",
    });
  };

  //MENSAJE DE ERROR
  const mostrarErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Ha salido algo mal",
      text: message,
    });
  };

  //MENSAJE DE ERROR
  const mostrarEAlert = (message) => {
    Swal.fire({
      icon: "success",
      title: "Felicidades",
      text: message,
    });
  };

  const guardarLogin = async (e) => {
    e.preventDefault();
    let nuevoPerfil = form;

    try {
      const request = await fetch(Global.url + "users/login", {
        method: "POST",
        body: JSON.stringify(nuevoPerfil),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(request);
      const data = await request.json();
      console.log(data);
      if (data.success === true) {
        //VEREFICO SI EL USUARIO EXISTE
        const usuarioExistente = localStorage.getItem("usuarios");
        if (usuarioExistente) {
          localStorage.removeItem("usuario");
        }
        localStorage.setItem("usuario", JSON.stringify(data.token));
        localStorage.setItem("rol", JSON.stringify(data.rol));
        console.log(data.token);
        console.log(data.rol);
        //MENSAJE EXITOSO
        setGuardado("Guardado");
        Swal.fire({
          icon: "success",
          title: "Login exitoso",
          text: "¡Te logeaste completamente con éxito!",
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          setnavLink(true);

          setTimeout(() => {
            window.location.reload();
          });
        });
      } else {
        //MENSAJE DE ERROR
        setGuardado("Error");
        mostrarErrorAlert(data.mensaje);
      }
    } catch (error) {
      //MENSAJE SI HAY PROBLEMA DEL SERVIDOR
      mostrarErrorAlert(
        "Algo salió mal. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

  if (navLink) {
    window.location.reload();
    return <Navigate to="/Inicio" />;
  }
  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 mb-3">
        <div className="wrapperr">
        <div className="inner">
          
          <form
            className="custom-form hero-form"
            action="#"
            method="post"
            role="form"
            onSubmit={guardarLogin}
          >
            <h3>Iniciar sesion</h3>

            <div className="form-wrapper">
              <label htmlFor="" style={{ color: "#cfb658" }}>
                Email
              </label>
              <input
                type="email"
                name="email_cliente"
                id="email_cliente"
                className="form-control"
                onChange={cambiar}
                required
              />
            </div>
            <div className="form-wrapper">
              <label htmlFor="" style={{ color: "#cfb658" }}>
                Password
              </label>
              <input
                type="password"
                name="password_cliente"
                id="password_cliente"
                className="form-control"
                onChange={cambiar}
                required
              />
            </div>

            

            <button
              type="submit"
              style={{
                backgroundColor: "#cfb658",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                display: "block",
                margin: "10px auto",
              }}
            >
              Iniciar sesion
            </button>
            <br />
            <a style={{ color: "white" }} href="./Registro">
              ¿aun no tienes cuenta?
            </a>
          </form>
        
        </div>
      </div>
        </div>
        <div className="col-md-5 mb-3">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
     
    </>
  );
};

export default Login;
