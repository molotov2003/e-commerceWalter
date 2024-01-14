import { useContext } from "react";
import AuthContext from "../../src/components/context/AuthProvier";

const UseAuth = () => {
  return useContext(AuthContext);
};

export default UseAuth;
