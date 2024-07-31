import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../context/Firebase";
import Cards from "../../components/cards/Cards";
import "./home.css";
import { myMessaging } from "../../context/Firebase";
import { getToken } from "firebase/messaging";

function Home() {
  const firebase = useFirebase();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    firebase.getAllBooks().then((books) => {
      setBooks(books.docs);
    });
  }, []);

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
  }, [navigate]);

  async function myRequestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(myMessaging, {
        vapidKey:
          "BMZC187vEDAJKwmjALLB5k6bwbetyegayQqIbEd4AFJB1zKVGqBwT49U90MA0-KtRkjjVnzylXD0T9crcX2J6F4",
      });
      console.log("token", token);
    } else if (permission === "denied") {
      alert("U denied for the notification");
    }
  }

  useEffect(() => {
    myRequestPermission();
  }, []);

  if (user === null)
    return (
      <p className="logout-message">Libraries full of books will be shown</p>
    );

  return (
    <>
      <div className="home">
        <h1>Here's Your Library!!!</h1>
        <div className="book-list">
          {books.map((book) => (
            <Cards key={book.id} bookId={book.id} book={book.data()} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
