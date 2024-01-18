import UseAuth from "../../helpers/UseAuth"
import { Navigate, Outlet } from "react-router-dom";

const LayoutPublico = () => {
  const { Autenticado } = UseAuth();
  console.log("Layout Publico", Autenticado);
  return <>{!Autenticado.id_cliente ? <Outlet /> : <Navigate to="/Inicio" />}</>;
};

export default LayoutPublico;
