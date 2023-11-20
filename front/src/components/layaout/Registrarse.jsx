import React, { Component, useState } from "react";
import HelperForm from "../../herlpers/HelperForm";
import { Global } from "../../herlpers/Global";


//login del usuario
const Registro = () => {
  
  return (
    <>
     <div className="wrapper" style="background-image: url('images/bg-registration-form-2.jpg');">
			<div className="inner">
				<form action="">
					<h3>Registration Form</h3>
					<div className="form-group">
						<div className="form-wrapper">
							<label htmlFor="">First Name</label>
							<input type="text" className="form-control"/>
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Last Name</label>
							<input type="text" className="form-control"/>
						</div>
					</div>
					<div className="form-wrapper">
						<label htmlFor="">Email</label>
						<input type="text" className="form-control"/>
					</div>
					<div className="form-wrapper">
						<label htmlFor="">Password</label>
						<input type="password" className="form-control"/>
					</div>
					<div className="form-wrapper">
						<label htmlFor="">Confirm Password</label>
						<input type="password" className="form-control"/>
					</div>
					<div className="checkbox">
						<label>
							<input type="checkbox"/> I caccept the Terms of Use & Privacy Policy.
							<span className="checkmark"></span>
						</label>
					</div>
					<button>Register Now</button>
				</form>
			</div>
		</div>
    </>
  );
};

export default Registro;