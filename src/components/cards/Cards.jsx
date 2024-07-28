import React, { useEffect, useState } from "react";
import "./cards.css";
import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";

function Cards({ book,bookId }) {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    firebase.getImageUrl(book.imageUrl).then((url) => setUrl(url));
  }, []);

  return (
    <>
      <div className="book" onClick={() => navigate(`/book/view/${bookId}`)}>
        <p className="book-name">{book.name}</p>
        <img src={url} className="book-image" alt="" />
        <span className="book-isbn">ISBN: <span className="book-isbn-no">{book.isbnNumber}</span></span>
        <p className="book-price">Rs.{book.price}</p>
      </div>
    </>
  );
}

export default Cards;
