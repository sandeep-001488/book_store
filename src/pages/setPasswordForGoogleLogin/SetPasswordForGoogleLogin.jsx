import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import { useLocation } from "react-router-dom";
import "./setPasswordForGoogleLogin.css";

const SetPasswordForGoogleLogin = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const firebase = useFirebase();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromSignup = queryParams.get("email");
    if (emailFromSignup) {
      setEmail(decodeURIComponent(emailFromSignup));
    }
  }, [location.search]);

  const handleSendPasswordEmail = async () => {
    if (!firebase || !email) return;

    try {
      await firebase.sendPasswordResetEmail(email);
      alert("Password set email sent. Set it for future reference.");
      navigate("/"); // Move to home page immediately
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Failed to send password reset email. Please try again.");
    }
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="google-redirect-container">
      <p>
        <span className="text">Set Password</span> for future reference or move
        to <span className="text"> Main Page</span> directly
      </p>
      <div className="send-email-emoji">
        <img src="/think.jpeg" alt="" className="person" />
        <button onClick={handleSendPasswordEmail} className="send-email">
          Send Email to Set Password
          <span>
            <img src="/file.png" alt="" className="email-img" />
          </span>
        </button>
      </div>
      <img src="/home.png" alt="" className="home-img" onClick={handleSkip} />
    </div>
  );
};

export default SetPasswordForGoogleLogin;
