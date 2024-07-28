// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./login.css";
// import { useFirebase } from "../../context/Firebase";
// import { Link, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const firebase = useFirebase();

//   const handleSubmit = async (event) => {
//     event.preventDefault(); // Prevent default form submission

//     if (!firebase) {
//       console.error("Firebase context is not available");
//       return;
//     }

//     try {
//       // Use the Firebase signInWithEmailAndPassword method
//       console.log("signing in...");
//       await firebase.signInUser(email, password);
//       console.log("signing in successful");

//       navigate("/");

//       setEmail("");
//       setPassword("");
//       // Optionally handle successful login, like redirecting to a dashboard or home page
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };
//   const handleGoogleLogin = async () => {
//     try {
//       await firebase.signInWithGoogle;
//       console.log("google sign in succeed");
//       navigate("/");
//     } catch (error) {
//       console.log("error lo gin with google on signup page", error);
//     }
//   };



//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="form-wrapper">
//           <h1 className="form-title">Login</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="emailLogin" className="email-login-name">
//                 Email address
//               </label>
//               <input
//                 type="text"
//                 name="email"
//                 id="emailLogin"
//                 placeholder="Enter your Email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 required
//                 className="form-input"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="passwordLogin" className="password-login-name">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 id="passwordLogin"
//                 placeholder="Enter your password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 required
//                 className="form-input"
//               />
//             </div>
//             <button type="submit" className="submit-button">
//               Login
//             </button>
//           </form>
//           <p className="no-account">Have no account?</p>
//           <Link to="/register" className="link-login">
//             Create Account
//           </Link>
//           <button
//             type="button"
//             className="google-login-btn"
//             onClick={handleGoogleLogin}
//           >
//             <span>
//               <FcGoogle />
//             </span>
//             Log in Using Gooogle
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./login.css";
// import { useFirebase } from "../../context/Firebase";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [comingFromSignup, setComingFromSignup] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const firebase = useFirebase();

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const fromSignup = queryParams.get('from') === 'signup';
//     if (fromSignup) {
//       setComingFromSignup(true);
//       const emailFromSignup = queryParams.get('email');
//       if (emailFromSignup) {
//         setEmail(decodeURIComponent(emailFromSignup));
//       }
//     }
//   }, [location.search]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!firebase) {
//       console.error("Firebase context is not available");
//       return;
//     }

//     try {
//       if (comingFromSignup) {
//         const signupPassword = localStorage.getItem('signupPassword');
//         if (password !== signupPassword) {
//           alert("The credentials you entered do not match the signup details.");
//           setPassword(""); // Clear password field
//           return;
//         }
//         localStorage.removeItem('signupPassword'); // Clear stored password after check
//       }
//       await firebase.signInUser(email, password);
//       navigate("/");
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("Error during login. Please check your credentials.");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await firebase.signInWithGoogle();
//       navigate("/");
//     } catch (error) {
//       console.log("Error logging in with Google on login page", error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="form-wrapper">
//           <h1 className="form-title">Login</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="emailLogin" className="email-login-name">
//                 Email address
//               </label>
//               <input
//                 type="text"
//                 name="email"
//                 id="emailLogin"
//                 placeholder="Enter your Email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 required
//                 className="form-input"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="passwordLogin" className="password-login-name">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 id="passwordLogin"
//                 placeholder="Enter your password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 required
//                 className="form-input"
//               />
//             </div>
//             <button type="submit" className="submit-button">
//               Login
//             </button>
//           </form>
//           <p className="no-account">Have no account?</p>
//           <Link to="/register" className="link-login">
//             Create Account
//           </Link>
//           <button
//             type="button"
//             className="google-login-btn"
//             onClick={handleGoogleLogin}
//           >
//             <span>
//               <FcGoogle />
//             </span>
//             Log in Using Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useFirebase } from "../../context/Firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comingFromSignup, setComingFromSignup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const firebase = useFirebase();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const fromSignup = queryParams.get('from') === 'signup';
    if (fromSignup) {
      setComingFromSignup(true);
      const emailFromSignup = queryParams.get('email');
      if (emailFromSignup) {
        setEmail(decodeURIComponent(emailFromSignup));
      }
    }
  }, [location.search]);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!firebase) {
      console.error("Firebase context is not available");
      return;
    }

    try {
      let userCredential;

      if (comingFromSignup) {
        const signupPassword = localStorage.getItem('tempPassword');
        if (password !== signupPassword) {
          alert("The credentials you entered do not match the signup details.");
          setPassword(""); 
          return;
        }
      }

      userCredential = await firebase.signInUser(email, password);

      if (userCredential && userCredential.user) {
        const user = userCredential.user;

        if (!user.emailVerified) {
          alert("Please verify your email address before logging in.");
          return;
        }

        navigate("/");
        localStorage.removeItem('tempPassword'); 
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await firebase.signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.log("Error logging in with Google on login page", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-wrapper">
          <h1 className="form-title">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="emailLogin" className="email-login-name">Email address</label>
              <input
                type="text"
                name="email"
                id="emailLogin"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordLogin" className="password-login-name">Password</label>
              <input
                type="password"
                name="password"
                id="passwordLogin"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-button">Login</button>
          </form>
          <p className="no-account">Don't have an account?</p>
          <Link to="/register" className="link-signup">Sign Up</Link>
          <button
            type="button"
            className="google-login-btn"
            onClick={handleGoogleLogin}
          >
            <span>
              <FcGoogle />
            </span>
            Log in Using Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
