import React, { Suspense } from "react";
import {useEffect,useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route,Navigate} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import NavbarTop from "./components/navbar/Navbar";

// Lazy-loaded components
const Home = React.lazy(() => import("./pages/home/Home"));
const Signup = React.lazy(() => import("./pages/signup/Signup"));
const Login = React.lazy(() => import("./pages/login/Login"));
const List = React.lazy(() => import("./pages/list/List"));
const BookDetail = React.lazy(() => import("./pages/bookDetail/BookDetail"));
const Message = React.lazy(() => import("./pages/message/Message"));
const ViewOrders = React.lazy(() => import("./pages/viewOrders/ViewOrders"));
const SetPasswordForGoogle = React.lazy(() =>
  import("./pages/setPasswordForGoogleLogin/SetPasswordForGoogleLogin")
);
function App() {
  // changed here
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Check if a user is stored in localStorage when the app loads
    const storedUser = localStorage.getItem("loginUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarTop />
        <div className="sections">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route
                path="/"
                element={loggedInUser ? <Home /> : <Navigate to="/login" />}
              />
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/listing" element={<List />} />
              <Route path="/book/view/:bookId" element={<BookDetail />} />
              <Route path="/:customerName/greetings" element={<Message />} />
              <Route path="/book/orders" element={<ViewOrders />} />
              <Route
                path="/google/set-password"
                element={<SetPasswordForGoogle />}
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
