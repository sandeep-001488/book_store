

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import "./bookDetail.css";

function BookDetail() {
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await firebase.getBookById(params.bookId);
        setData(bookData.data());
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchData();
  }, [params.bookId, firebase]);

  useEffect(() => {
    if (data && data.imageUrl) {
      const fetchImageUrl = async () => {
        try {
          const imgUrl = await firebase.getImageUrl(data.imageUrl);
          setUrl(imgUrl);
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      };

      fetchImageUrl();
    }
  }, [data, firebase]);

  const emailName = (email) => {
    if (typeof email === "string") {
      const namePart = email.split("@")[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    return "Unknown";
  };

  const placeOrderBook = async (e) => {
    e.preventDefault();
    if (qty >= 1) {
      try {
        await firebase.placeOrder(params.bookId, qty);
        navigate(`/${emailName(data.userEmail)}/greetings`);
        setQty(1);
      } catch (error) {
        console.error("Error placing order:", error);
      }
    } else {
      alert("Quantity must be at least 1");
    }
  };

  if (data === null) return <p>Loading..</p>;

  return (
    <div className="bookDetail">
      <div className="bookDetailWrapper">
        <p className="dataName">{data.name || "Unknown Book"}</p>
        <div className="book-and-img">
          <img
            src={url || "/library.jpg"}
            alt="Book Cover"
            className="dataImg"
          />
          <div className="book-details">
            <p className="dataDetails">Details..</p>
            <p className="dataPrice"><span style={{color:"green" ,fontSize:"25px"}}> Price Rs:</span> {data.price}</p>
            <p className="dataIsbn"><span style={{color:"green",fontSize:"25px"}}>ISBN no.:</span>{data.isbnNumber}</p>
            <p className="dataOwner"><span style={{color:"green",fontSize:"25px"}}>Owner:</span>{emailName(data.userEmail)}</p>
          </div>
        </div>

        <form onSubmit={placeOrderBook}>
          <label htmlFor="quantity" className="qty-input-name">
            No. of books you want to buy..?
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="No. of books"
            onChange={(e) => setQty(e.target.value)}
            value={qty}
            required
            className="qty-input"
          />
          <button type="submit" className="buy-button">
            Buy Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookDetail;
