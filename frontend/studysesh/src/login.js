import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = ({ className, textOutput }) => {
  const { loginWithRedirect } = useAuth0();

  return <button className={className} onClick={() => loginWithRedirect()}> {textOutput} </button>;
};

export default LoginButton;