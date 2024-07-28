import React, { useEffect, useState } from "react";
import "./bookDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";

function BookDetail() {
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [qty,setQty]=useState(1)
  const navigate=useNavigate()

  useEffect(() => {
    firebase.getBookById(params.bookId).then((val) => {
      setData(val.data());
    //   console.log(val.data());
    });
  }, []);

  useEffect(() => {
    if (data) {
      const imgUrl = data.imageUrl;
      firebase.getImageUrl(imgUrl).then((url) => setUrl(url));
    }
  }, []);

  const emailName = (email) => {
    if (typeof email === "string") {
      const namePart = email.split("@")[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    return "Unknown"; // Return a default value if email is not a valid string
  };
  const placeOrderBook=async(e)=>{
   e.preventDefault();
   if(qty>=1){
    await firebase.placeOrder(params.bookId,qty)
    navigate(`/${emailName(data.userEmail)}/greetings`)
    setQty(1)
   }else{
    alert("qty must be atleast 1")
   }
   
  }

  if (data == null) return <p>Loading..</p>;

  return (
    <div className="bookDetail">
      <p className="dataName">{data ? data.name : "unKnown User"} </p>
      <img src={data ? url : "library.jpg"} alt="img" className="dataImg" />
      <p className="dataDetails">Details..</p>
      <p className="dataPrice">Price Rs:{data.price}</p>
      <p className="dataIsbn">ISBN no.:{data.isbnNumber}</p>
      <p className="dataOwner">Owner:{emailName(data.userEmail)}</p>
      <form onSubmit={placeOrderBook}>
      <label htmlFor="quantity" className="qty-input-name">No. of books u want to buy ..?</label>
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
        <button type="submit" className="buy-button">Buy Now</button>
      </form>
    </div>
  );
}

export default BookDetail;
