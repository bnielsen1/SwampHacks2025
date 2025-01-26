import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = ({ className }) => {
  const { loginWithRedirect } = useAuth0();

  return <button className={className} onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;