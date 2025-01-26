import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = ({ className }) => {
  const { logout } = useAuth0();

  return (
    <button className={className} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;