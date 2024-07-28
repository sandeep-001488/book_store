import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import NavbarTop from "./components/navbar/Navbar";
import List from "./pages/list/List";
import { BrowserRouter } from "react-router-dom";
import BookDetail from "./pages/bookDetail/BookDetail";
import Message from "./pages/message/Message";
import ViewOrders from "./pages/viewOrders/ViewOrders";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App" >
          <NavbarTop />
          <div className="sections">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/listing" element={<List />} />
            <Route path="/book/view/:bookId" element={<BookDetail/>}/>
            <Route path="/:customerName/greetings" element={<Message/>}/>
            <Route path="/book/view/:bookId" element={<BookDetail/>}/>
            <Route path="/book/orders" element={<ViewOrders/>}/>

          </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
