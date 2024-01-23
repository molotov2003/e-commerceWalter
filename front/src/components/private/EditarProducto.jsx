import { useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import { Navigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const ModalEditar = ({
  nombre_producto,
  descripcion_producto,
  precio_producto,
  stock_producto,
  id_categoria,
  producto_id,
}) => {
  //REDIRECCIONA
  console.log(producto_id);
  const { form, cambiar } = HelperForm({});
  const [, setGuardado] = useState("");
  const [navLink, setnavLink] = useState(false);

  const [editedProductoId, setEditedProductoId] = useState(producto_id);
  const [editedNombreProducto, setEditedNombreProducto] =
    useState(nombre_producto);
  const [editedDescripcionProducto, setEditedDescripcionProducto] =
    useState(descripcion_producto);
  const [editedPrecioProducto, setEditedPrecioProducto] =
    useState(precio_producto);
  const [editedStockProducto, setEditedStockProducto] =
    useState(stock_producto);
  const [editedIdCategoria, setEditedIdCategoria] = useState(id_categoria);

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
  const mostrarAlert = (message) => {
    Swal.fire({
      icon: "success",
      title: "Felicidades",
      text: message,
    });
  };
  //// Editar Producto
  const editarProducto = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("producto_id", editedProductoId);
    formData.append("nombre_producto", editedNombreProducto);
    formData.append("descripcion_producto", editedDescripcionProducto);
    formData.append("precio_producto", editedPrecioProducto);
    formData.append("stock_producto", editedStockProducto);
    // formData.append("img", imagen);
    formData.append("id_categoria", editedIdCategoria);

    console.log(formData);
    try {
      const request = await fetch(Global.url + "products/actualizarProducto", {
        method: "POST",
        body: formData,
      });
      console.log(request);
      const data = await request.json();

      if (data.status === true) {
        // MENSAJE EXITOSO
        console.log(data);
        setGuardado("Guardado");

        mostrarAlert(data.mensaje);
        window.location.reload();
        return <Navigate to="/AgregarProduct" />;
      } else {
        // MENSAJE DE ERROR
        setGuardado("Error");
        mostrarErrorAlert(data.mensaje);
      }
    } catch (error) {
      // MENSAJE SI HAY PROBLEMA DEL SERVIDOR
      mostrarErrorAlert(
        "Algo salió mal. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id={`#exampleModal${producto_id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Editar Producto
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="custom-form hero-form"
                action="#"
                method="get"
                role="form"
                onSubmit={editarProducto}
                encType="multipart/form-data"
              >
                {/* ... Otros campos de formulario ... */}

                <div className="form-wrapper">
                  <label htmlFor="">Id del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    name="producto_id"
                    id="producto_id"
                    value={editedProductoId}
                    onChange={(e) => setEditedProductoId(e.target.value)}
                    required
                  />
                </div>
                <div className="form-wrapper">
                  <label htmlFor="">Nombre Del Producto</label>
                  <input
                    className="form-control"
                    type="text"
                    name="nombre_producto"
                    id="nombre_producto"
                    value={editedNombreProducto}
                    onChange={(e) => setEditedNombreProducto(e.target.value)}
                    required
                  />
                </div>
                <div className="form-wrapper">
                  <label htmlFor="">Descripcion</label>
                  <input
                    className="form-control"
                    type="text"
                    name="descripcion_producto"
                    id="descripcion_producto"
                    value={editedDescripcionProducto}
                    onChange={(e) => setEditedDescripcionProducto(e.target.value)}
                    required
                  />
                </div>
                <div className="form-wrapper">
                  <label htmlFor="">Precio</label>
                  <input
                    className="form-control"
                    type="text"
                    name="precio_producto"
                    id="precio_producto"
                    value={editedPrecioProducto}
                    onChange={(e) => setEditedPrecioProducto(e.target.value)}
                    required
                  />
                </div>
                <div className="form-wrapper">
                  <label htmlFor="">Cantidad</label>
                  <input
                    className="form-control"
                    type="text"
                    name="stock_producto"
                    id="stock_producto"
                    value={editedStockProducto}
                    onChange={(e) => setEditedStockProducto(e.target.value)}
                    required
                  />
                </div>
                <div className="form-wrapper">
                  <label htmlFor="">Agregar Categoria</label>
                  {/* <select
                      onChange={id_categoria}
                      className="form-control"
                      name="Categoria_idCategoria"
                      aria-label="Default select example"
                    >
                      <option selected>Selecciona una Categorias</option>

                      {categorias.map((categoria) => (
                        <option
                          key={categoria.categoria_id}
                          value={categoria.categoria_id}
                          name="id_categoria"
                          id="id_categoria"
                        >
                          {categoria.nombre_categoria}
                        </option>
                      ))}
                    </select> */}
                </div>

                {/* Resto del formulario... */}

                <button type="submit" className="btn btn-success">
                  Editar Producto
                </button>
                <br />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEditar;
