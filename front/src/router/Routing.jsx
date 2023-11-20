import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../components/layaout/Login";
import { AuthProvider } from "../context/AuthProvider";
import LayaoutPublico from "../components/layaout/LayaoutPublico";

const Routing =()=>{
    <BrowserRouter>
     
        <Routes path="/" element={<LayaoutPublico/>} >
         <Route index element={<Login/>} />
        </Routes>
    
    </BrowserRouter>
}

export default Routing;
