
// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./signup.css";
// import { useFirebase } from "../../context/Firebase";
// import { Link, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { firebaseAuth } from "../../context/Firebase";
// import {
//   getAuth,
//   fetchSignInMethodsForEmail,
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";
// import { app } from "../../context/Firebase";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);
//   const [googleLogin, setGoogleLogin] = useState(false);
//   const firebase = useFirebase();
//   const navigate = useNavigate();
//   const auth = getAuth(app);
//   const { getSignInMethodsForEmail, signInWithGoogle } = useFirebase();

//   useEffect(() => {
//     if (registrationSuccess) {
//       if (googleLogin) {
//         // Redirect to login page after setting password for Google sign-up
//         navigate(`/login?from=signup&email=${encodeURIComponent(email)}`);
//       } else {
//         // For email sign-ups, navigate to login page after successful sign-up
//         navigate(`/login?from=signup&email=${encodeURIComponent(email)}`);
//       }
//     }
//   }, [registrationSuccess, navigate, email, googleLogin]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (googleLogin) {
//       try {
//         // Create a new user with email and password
//         await firebase.registerWithEmailAndPassword(email, password);
//         // Navigate to login page after successful sign-up
//         setRegistrationSuccess(true);
//       } catch (error) {
//         console.error("Error during Google sign-up:", error.message);
//         alert("An error occurred during sign-up. Please try again.");
//       }
//       return;
//     }

//     try {
//       const signInMethods = await getSignInMethodsForEmail(email);

//       if (signInMethods.length > 0) {
//         alert("The email address is already in use by another account.");
//         setEmail("");
//         setPassword("");
//         setRegistrationSuccess(false);
//       } else {
//         const userCredential = await firebase.registerWithEmailAndPassword(email, password);

//         if (userCredential && userCredential.user) {
//           const user = userCredential.user;

//           await sendEmailVerification(user);
//           alert("Verification email sent. Please check your inbox.");

//           localStorage.setItem('tempPassword', password);
//           setRegistrationSuccess(true);
//         } else {
//           throw new Error("User credential object is invalid.");
//         }
//       }
//     } catch (error) {
//       console.error("Error during sign up:", error.message);
//       alert("An error occurred during sign-up. Please try again.");
//       setEmail("");
//       setPassword("");
//       setRegistrationSuccess(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await firebase.signInWithGoogle();
//       const user = result.user;

//       if (user) {
//         const signInMethods = await firebase.getSignInMethodsForEmail(user.email);

//         if (signInMethods.length === 0) {
//           // Email is not in use, proceed with Google login
//           setRegistrationSuccess(false);

//           setGoogleLogin(true);

//           setEmail(user.email || "");
//         } else {
//           // Email is already associated with another account
//           alert("This email is already associated with another account. Please log in with the existing account or use a different email.");
//         }
//       }
//     } catch (error) {
//       console.error("Error logging in with Google:", error);
//       alert("An error occurred with Google sign-up. Please try again.");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <div className="form-wrapper">
//           <h1 className="form-title">Sign Up</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="emailSignup" className="email-name">
//                 Email address
//               </label>
//               <input
//                 type="text"
//                 name="email"
//                 id="emailSignup"
//                 placeholder="Enter your Email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 required
//                 className="form-signup-input"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="passwordSignup" className="password-name">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 id="passwordSignup"
//                 placeholder="Enter your password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 required
//                 className="form-input"
//               />
//             </div>
//             <button type="submit" className="submit-button">
//               {googleLogin ? "Set Password" : "Sign Up"}
//             </button>
//           </form>
//           <p className="no-account">Have no account?</p>
//           <Link to="/login" className="link-signup">
//             Login
//           </Link>
//           <button
//             type="button"
//             className="google-signup-btn"
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

// export default Signup;
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

