import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../components/layaout/Login";
import Registrarse from "../components/layaout/Registrarse"
//import { AuthProvider } from "../context/AuthProvider";
//import LayaoutPublico from "../components/layaout/LayaoutPublico";

const Routing =()=>{
    <BrowserRouter>
     
      <Routes >
          <Route path="/" element={<Login/>} />    
          <Route path="/Registrarse" element={<Registrarse/>} />    
      </Routes>
               
    </BrowserRouter>
}

export default Routing;
