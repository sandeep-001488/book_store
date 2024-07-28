import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {  signOut } from "firebase/auth";
import { firebaseAuth } from "../../context/Firebase";
import { onAuthStateChanged } from "firebase/auth";

function NavbarTop() {
  const navigate=useNavigate()
  const [user,setUser]=useState(null)
  const [color, setColor] = useState("#000000");
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
       
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    // Function to generate a random color
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    // Change color every 2 seconds
    const intervalId = setInterval(() => {
      setColor(getRandomColor());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      navigate('/login');
      setUser(null)
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Navbar data-bs-theme="dark" className="navbarTop">
      <Container>
        <Navbar.Brand as={Link} to="/"  style={{ color: color }}  className="home-link">
          BookyTore
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={Link} to="/listing" className="list-link">
            Add Listing
          </Nav.Link>
          <Nav.Link as={Link} to="/book/orders" className="list-link">
            Orders
          </Nav.Link>
          <Nav.Link as={Link}  to='/login' className={user?"login-link-hide":"list-link"} onClick={handleLogout}>
           Sign In
          </Nav.Link>
          <Nav.Link as={Link} className={!user?"logout-link-hide":"list-link"} onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
