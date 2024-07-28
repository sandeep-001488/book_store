import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../context/Firebase";
import Cards from "../../components/cards/Cards";
import "./home.css";

function Home() {
  const firebase = useFirebase();
  const [user, setUser] = useState(null);
  const navigate=useNavigate()
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


  if (user === null) return <p className="logout-message">Libraries full of books will be shown</p>;

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
