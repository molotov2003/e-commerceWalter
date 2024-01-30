import { NavLink } from "react-router-dom";
import React, { useEffect,useState  } from "react";
import Header from "../private/Header";
import Footerr from "../private/Footer";
import logo from "../../assets/img/logo1.png";
import user from "../../assets/img/user.png";
import imgnav from "../../assets/img/image1.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../helpers/UseAuth";
import { Global } from "../../helpers/Global";

const Producto = () => {
  /// traigo el token
  const usuarioo = localStorage.getItem("usuario");
  const userObj = JSON.parse(usuarioo);

  const mostrarAlert = (message) => {
    Swal.fire({
      icon: "success",
      title: "Felicidades",
      text: message,
    });
  };
 
  const mostrarErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Que mal",
      text: message,
    });
  };
  
  const { setAutenticado } = UseAuth();
  const { Autenticado } = UseAuth();
  const [categorias, setCategorias] = useState([]);
  const [categoriaa, setCategoriass] = useState("");

  //REDIRIGE
  console.log(Autenticado);
  //ALERTA PARA CERRAR SESION
  const navigate = useNavigate();
  const usuario = localStorage.getItem("rol");
  let rol = JSON.parse(usuario);


  const [id, setId] = useState("");
  const [, setGuardado] = useState("");

    
  console.log(id)
  console.log(rol[0].id_cliente)
  console.log(userObj)
  /////////////////// Listar los metodos de pago
  const traerCategorias = async () => {
    try {
      const response = await fetch(Global.url + "metodosPago/listarMetodoPago", {
        method: "GET",
        headers: {
          Authorization: userObj,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener metodo de pago");
      }
      const data = await response.json();
      if (data.status === true) {
        console.log(data.categorias);
        setCategorias(data.categorias);
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };


  
 


   /////Agregar el encabezado
   const encabezado = async (e) => {

    e.preventDefault();
    const fechaActual = new Date();
    const fechaActualString = fechaActual.toISOString().split('T')[0];
    console.log(fechaActualString);
    let total = 1;
    let idestado =1;
    let idmetodo =1
    let idusuario =1;
    let cantidad =1;
    const formData = new FormData();

    formData.append("FechayHora", fechaActual);
    formData.append("total", total );
    formData.append("idEstado", idestado);
    formData.append("idUsuario", idusuario);
    formData.append("idMetodo", idmetodo);
    formData.append("cantidad", cantidad);
    console.log(formData);
    try {
      const request = await fetch(Global.url + "encabezado/AgregarEncabezado", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: userObj,
        },
      });

      console.log(userObj);
      const data = await request.json();

      if (data.status == 200) {
        // MENSAJE EXITOSO
        console.log(data);
        setGuardado("Guardado");
        mostrarAlert("Se ha agregado correctamente");
      } else {
        // MENSAJE EXITOSO
        console.log(data);
        setGuardado("Guardado");
        mostrarAlert("Se ha agregado correctamente");
      }
    } catch (error) {
      // MENSAJE SI HAY PROBLEMA DEL SERVIDOR
      mostrarErrorAlert(
        "Algo salió mal. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

  const guardarCards = async (e) => {
    e.preventDefault();
  
    // Verificar si rol[0] está definido y tiene un valor para id_cliente
    if (!rol[0] || !rol[0].id_cliente) {
      console.error("Error: id_cliente no está definido o es nulo.");
      return;
    }
  
    const formData = new FormData();
    formData.append("idMetodo", id);
    formData.append("clienteId", rol[0].id_cliente);
  
    try {
      const request = await fetch(Global.url + "encabezado/EnviarCorreoFactura", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: userObj,
        },
      });
  
      const data = await request.json();
  
      if (data.status === 200) {
        // MENSAJE EXITOSO
        console.log(data);
        setGuardado("Guardado");
        mostrarAlert("Se ha realizado dla compra correctamente");
      } else {
        // MENSAJE DE ERROR
        console.log(data);
        setGuardado("No guardado");
        mostrarErrorAlert("Hubo un errfdfsfor al realizar la compra.");
      }
    } catch (error) {
      // MENSAJE SI HAY PROBLEMA DEL SERVIDOR
      mostrarErrorAlert(
        "Algo salió mal. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };
  

  useEffect(() => {
    traerCategorias();
  }, []);

  return (
    <>
      <Header />
      <br />
      <div style={{ textAlign: "center", color: "white" }}>
        <h1>Comprar</h1>
      </div>

      <br />

      <form  className="custom-form hero-form"
          action="#"
          method="post"
          role="form"
          onSubmit={encabezado}
          encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label" style={{ color: "white" }}>
            Nombre
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={rol[0].nombre_cliente}
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ color: "white" }}>
            Correo electronico
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={rol[0].email_cliente}
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ color: "white" }}>
            Direccion
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={rol[0].direccion_cliente}
          />
          <div id="emailHelp" className="form-text"></div>
        </div>

        <div className="form-wrapper">
          <label style={{ color: "white" }} htmlFor="">
          Seleccionar metodo de pago
          </label>
          <select
           onChange={(e) => setId(e.target.value)}
            className="form-control"
            name="idMetodo"
            aria-label="Default select example"
          >
            <option selected>Seleccionar metodo de pago</option>

            {categorias.map((categoria) => (
              <option
                key={categoria.idMetodo}
                value={categoria.idMetodo}
                name="idMetodo"
                id="idMetodo"
                
              >
                {categoria.Descripcion}
              </option>
            ))}
          </select>
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
          {" "}
          <i className="bi bi-bag">Comprar</i>
        </button>
      </form>

      <Footerr />
    </>
  );
};

export default Producto;
