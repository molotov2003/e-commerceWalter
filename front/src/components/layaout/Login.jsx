import React, { Component, useState } from "react";
import HelperForm from "../../herlpers/HelperForm";
import { Global } from "../../herlpers/Global";


//login del usuario
const Login = () => {
  
  return (
    <>
    <div className="wrapper" style="background-image: url('images/bg-registration-form-2.jpg');">
			<div className="inner">
				<form action="">
					<h3>Iniciar sesion</h3>
					
					<div className="form-wrapper">
						<label htmlFor="">Email</label>
						<input type="text" className="form-control"/>
					</div>
					<div className="form-wrapper">
						<label htmlFor="">Password</label>
						<input type="password" className="form-control"/>
					</div>
					
				
					<button>Iniciar sesion</button>
				</form>
			</div>
		</div>
    </>
  );
};

export default Login;