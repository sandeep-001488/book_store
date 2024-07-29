import React, { Suspense } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import NavbarTop from "./components/navbar/Navbar";

// Lazy-loaded components
const Home = React.lazy(() => import('./pages/home/Home'));
const Signup = React.lazy(() => import('./pages/signup/Signup'));
const Login = React.lazy(() => import('./pages/login/Login'));
const List = React.lazy(() => import('./pages/list/List'));
const BookDetail = React.lazy(() => import('./pages/bookDetail/BookDetail'));
const Message = React.lazy(() => import('./pages/message/Message'));
const ViewOrders = React.lazy(() => import('./pages/viewOrders/ViewOrders'));

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarTop />
        <div className="sections">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/listing" element={<List />} />
              <Route path="/book/view/:bookId" element={<BookDetail />} />
              <Route path="/:customerName/greetings" element={<Message />} />
              <Route path="/book/orders" element={<ViewOrders />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
