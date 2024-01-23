import { useContext } from "react";
import AuthContext from "../components/context/AuthProvideEcommerce";

const UseAuth = () => {
  return useContext(AuthContext);
};

export default UseAuth;