import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "../components/layaout/Login";
import Registro from "../components/layaout/Registro";
import Inicio from "../components/public/Inicioo";
import Carrito from "../components/public/Carrito";
import Producto from "../components/public/Producto";

import AgregarProduct from "../components/private/AgregarProduct";
import Error from "../components/private/Error";
import LayoutPublico from "../components/layaout/LayoutPublic";
import LayoutPrivada from "../components/private/LayoutPrivada";
import { AuthProvider } from "../components/context/AuthProvier";
const Routing = () => {
  //Creacion del sistema de rutas
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/*Rutas publicas*/}
          <Route path="/" element={<LayoutPublico />}>
            <Route index element={<Login />}></Route>
            <Route path="/Registro" element={<Registro />}></Route>
            <Route path="/Inicio" element={<Inicio />}></Route>
            <Route path="/Carrito" element={<Carrito />}></Route>
            <Route path="/AgregarProduct" element={<AgregarProduct />}></Route>
            <Route path="/Producto" element={<Producto />}></Route>
           
            
          </Route>

          <Route path="/" element={<LayoutPrivada />}>
           
            {/*Rutas privadas*/}
         
          </Route>

          {/*Rutas Error*/}
          <Route path="/Error" element={<Error />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
