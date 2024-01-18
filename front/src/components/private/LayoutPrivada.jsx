import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";

const LayoutPrivada = () => {
  const { Autenticado } = UseAuth();
  return (
    <>
      {Autenticado && Autenticado.id_cliente ? (
        <Outlet />
      ) : (
        <Navigate to="/Inicio" />
      )}
    </>
  );
};

export default LayoutPrivada;
