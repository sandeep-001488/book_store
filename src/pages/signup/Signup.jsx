
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./signup.css";
import { useFirebase } from "../../context/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (registrationSuccess) {
      // Navigate to login page after successful sign-up
      navigate(`/login?from=signup&email=${encodeURIComponent(email)}`);
    }
  }, [registrationSuccess, navigate, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const signInMethods = await firebase.getSignInMethodsForEmail(email);

      if (signInMethods.length > 0) {
        alert("The email address is already in use by another account.");
        setEmail("");
        setPassword("");
        setRegistrationSuccess(false);
      } else {
        const userCredential = await firebase.registerWithEmailAndPassword(email, password);

        if (userCredential && userCredential.user) {
          const user = userCredential.user;

          await sendEmailVerification(user);
          alert("Verification email sent. Please check your inbox.");

          localStorage.setItem('tempPassword', password);
          setRegistrationSuccess(true);
        } else {
          throw new Error("User credential object is invalid.");
        }
      }
    } catch (error) {
      console.error("Error during sign up:", error.message);
      alert("An error occurred during sign-up. Please try again.");
      setEmail("");
      setPassword("");
      setRegistrationSuccess(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="form-wrapper">
          <h1 className="form-title">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="emailSignup" className="email-name">
                Email address
              </label>
              <input
                type="text"
                name="email"
                id="emailSignup"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="form-signup-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordSignup" className="password-name">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="passwordSignup"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
          <p className="no-account-signup">Have an account?</p>
          <Link to="/login" className="link-login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

