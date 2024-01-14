import { useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import { NavLink, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const Registro = () => {
  const navigate = useNavigate();
  const [, setGuardado] = useState("");
  const { form, cambiar } = HelperForm({});

  //MENSAJE DE LOS CAMPOS VACIOS
  const mostrarCamposVaciosAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Campos Vacíos ",
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
  //VALIDACION DEL FORMULARIO
  const validarFormulario = () => {
    if (
      !form.id_cliente ||
      !form.nombre_cliente ||
      !form.email_cliente ||
      !form.direccion_cliente ||
      !form.password_cliente 
    
    ) {
      console.log(form);
      mostrarCamposVaciosAlert();
      return false;
    }
    return true;
  };
  //BOTON GUARDAR
  const guardarRegistro = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }
    let nuevoPerfil = { ...form, id_cliente:parseInt(form.id_cliente) };
    console.log(nuevoPerfil);
    try {
      const response = await fetch(Global.url + "users/insertar", {
        method: "POST",
        body: JSON.stringify(nuevoPerfil),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
	  console.log(data);
      if (data.success === true) {
        //MENSAJE EXITOSO
        setGuardado("Guardado");
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "¡Tu registro se ha completado con éxito!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
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
  return (
    <>
      <div className="wrapper">
        <div className="inner">
          <form className="custom-form hero-form"
            action="#"
            method="post"
            role="form"
            onSubmit={guardarRegistro}>

            <h3>Registrarse</h3>
            <div className="form-wrapper">
              <label htmlFor="">cedula</label>
              <input type="text"
                    name="id_cliente"
                    id="id_cliente"
                    className="form-control"
                    
                    onChange={cambiar}
                    required/>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Nombre</label>
              <input type="text"
                    name="nombre_cliente"
                    id="nombre_cliente"
                    className="form-control"
                    
                    onChange={cambiar}
                    required/>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Email</label>
              <input type="text"
                    name="email_cliente"
                    id="email_cliente"
                    className="form-control"
                    
                    onChange={cambiar}
                    required />
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Direccion</label>
              <input type="text"
                    name="direccion_cliente"
                    id="direccion_cliente"
                    className="form-control"
               
                    onChange={cambiar}
                    required  />
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Password</label>
              <input type="text"
                    name="password_cliente"
                    id="password_cliente"
                    className="form-control"              
                    onChange={cambiar}
                    required  />
            </div>

            <button type="submit">Iniciar sesion</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registro;
