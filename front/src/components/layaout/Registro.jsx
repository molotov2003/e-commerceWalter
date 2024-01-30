import { useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import { NavLink, useNavigate } from "react-router-dom";

import img from "../../assets/img/logo1.png";

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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 mb-3"><div className="wrapperr">
        <div className="inner">
          <form className="custom-form hero-form"
            action="#"
            method="post"
            role="form"
            onSubmit={guardarRegistro}>

            <h3>Registrarse</h3>
            <div className="form-wrapper">
              <label htmlFor="" style={{ color: "#cfb658" }}>cedula</label>
              <input type="text"
                    name="id_cliente"
                    id="id_cliente"
                    className="form-control"
                    
                    onChange={cambiar}
                    required/>
            </div>
            <div className="form-wrapper">
              <label htmlFor="" style={{ color: "#cfb658" }}>Nombre</label>
              <input type="text"
                    name="nombre_cliente"
                    id="nombre_cliente"
                    className="form-control"
                    
                    onChange={cambiar}
                    required/>
            </div>
            <div className="form-wrapper">
              <label htmlFor="" style={{ color: "#cfb658" }}>Email</label>
              <input type="text"
                    name="email_cliente"
                    id="email_cliente"
                    className="form-control"
                    
                    onChange={cambiar}
                    required />
            </div>
            <div className="form-wrapper">
              <label htmlFor="" style={{ color: "#cfb658" }}>Direccion</label>
              <input type="text"
                    name="direccion_cliente"
                    id="direccion_cliente"
                    className="form-control"
               
                    onChange={cambiar}
                    required  />
            </div>
            <div className="form-wrapper">
              <label htmlFor="" style={{ color: "#cfb658" }}>Password</label>
              <input type="text"
                    name="password_cliente"
                    id="password_cliente"
                    className="form-control"              
                    onChange={cambiar}
                    required  />
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
              Registrate
            </button>
            <br />
            <a style={{color:"white"}} href="./">¿Ya tienes cuenta?</a>
          </form>
        </div>
      </div></div>
        <div className="col-md-5 mb-3">   <img src={img} alt="" /></div>
      </div>
    </div>
      
    </>
  );
}

export default Registro;
