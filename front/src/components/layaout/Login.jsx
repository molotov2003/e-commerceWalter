
import { useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import { Navigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

import img from "../../assets/img/bg-registration-form-2.jpg";

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
      title: "Error",
      text: message,
    });
  };

  //VALIDACION DE LOS CAMPOS VACIOS
  const validarFormulario = () => {
    if (!form.email_cliente || !form.password_cliente) {
      mostrarCamposVaciosAlert();
      return false;
    }
    return true;
  };

  const guardarLogin = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    let nuevoPerfil = form;

    try {
      const request = await fetch(Global.url + "users/login", {
        method: "POST",
        body: JSON.stringify(nuevoPerfil),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await request.json();
      if (data.success === true) {
        //VEREFICO SI EL USUARIO EXISTE
        const usuarioExistente = localStorage.getItem("usuario");
        if (usuarioExistente) {
          localStorage.removeItem("usuario");
        }
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        console.log(data.usuario);

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
      <div className="wrapper">
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
              <label htmlFor="">Email</label>
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
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password_cliente"
                id="password_cliente"
                className="form-control"
                onChange={cambiar}
                required
              />
            </div>

            <button>Iniciar sesion</button>
            <a href="./Registro">¿aun no tienes cuenta?</a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
