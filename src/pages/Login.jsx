import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../StateProvider";
import { AuthContext } from "../auth/AuthProvider";
import { Button } from "antd";
import Element from "../components/Element";

const Login = () => {
  const { state } = useContext(Store);
  const { checkAuth, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.token) {
      navigate("dashboard");
    } else {
      checkAuth();
    }
  }, [state?.token]);

  return (
    <Element
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="#ECECEE"
    >
      <Element width="55%" display="flex" backgroundColor="#FFF" color="#FFF">
        <Element
          width="60%"
          padding="20px"
          backgroundColor="#2971FB"
          lineHeight="22px"
          letterSpacing="1px"
        >
          <Element
            type="p"
            fontSize="24px"
            fontWeight="bold"
            marginBottom="12px"
          >
            PDP
          </Element>
          <Element type="p" textAlign="justify">
            The Project Delivery Performance (PDP) Dashboard provides a
            comprehensive overview of project performance against the following
            key aspects:
          </Element>
          <Element type="ol" marginTop="10px" fontWeight="bold" fontSize="14px">
            <Element type="li">CLIENT SATISFACTION</Element>
            <Element type="li">DELIVERY MANAGEMENT EFFECTIVENESS</Element>
            <Element type="li">DEVELOPMENT EFFECTIVENESS</Element>
            <Element type="li">PROCESS EFFECTIVENESS</Element>
          </Element>
        </Element>
        <Element
          width="40%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button type="primary" onClick={login}>
            Log in
          </Button>
        </Element>
      </Element>
    </Element>
  );
};

export default Login;
