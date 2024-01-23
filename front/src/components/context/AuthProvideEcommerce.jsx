import { useState, useEffect, createContext } from "react";
import { Global } from "../../helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Autenticado, setAutenticado] = useState({});

  useEffect(() => {
    autenticarUsuario();
  }, []);
  const autenticarUsuario = async () => {
    const usuario = localStorage.getItem("usuarios");
    console.log(usuario)
    try {
      const userObj = JSON.parse(usuario);
      // if (!userObj.token || !userObj.nombre) {
      //   return false;
        
      // }
      console.log(userObj)
      const request = await fetch(
        Global.url + "users/listarunUsuario/" + userObj.id_cliente,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"         
          },
        }
      );

      if (!request.ok) {
        console.error("Error en la autenticación:", request.statusText);
        return;
      }
     
      const data = await request.json();

      setAutenticado(data.usuario);
      console.log(data)
    } catch (error) {
      console.error("Error en la solicitud:", error.message);

    }
     
  };

  return (
    <AuthContext.Provider value={{ Autenticado, setAutenticado }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
