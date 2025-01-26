import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SendEmailButton = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  const sendEmailToBackend = async () => {
    if (!isAuthenticated) {
      console.log("User not authenticated");
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch("http://localhost:8000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();
      console.log("Backend Response:", data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    isAuthenticated && (
      <button onClick={sendEmailToBackend}>
        Send Email to Backend
      </button>
    )
  );
};

export default SendEmailButton;
