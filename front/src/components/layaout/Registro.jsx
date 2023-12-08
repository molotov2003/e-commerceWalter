import { NavLink } from "react-router-dom";
import img from "../../assets/img/bg-registration-form-2.jpg"
const Login = () => {
  return (
    <>
      <div className="wrapper" >
			<div className="inner">
				<form action="">
					<h3>Registrarse</h3>
					<div className="form-wrapper">
						<label htmlFor="">Nombre</label>
						<input type="text" className="form-control"/>
					</div>
					<div className="form-wrapper">
						<label htmlFor="">Apellido</label>
						<input type="password" className="form-control"/> 
					</div>
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