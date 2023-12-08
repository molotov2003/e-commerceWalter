import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "../components/layaout/Login";
import Registro from "../components/layaout/Registro"
import Inicio from "../components/public/inicio";
import Carrito from "../components/public/Carrito";
import Producto from "../components/public/Producto";
const Routing = () => {
  //Creacion del sistema de rutas
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Registro" element={<Registro />}></Route>
        <Route path="/Inicio" element={<Inicio />}></Route>
        <Route path="/Carrito" element={<Carrito />}></Route>
        <Route path="/Producto" element={<Producto />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
