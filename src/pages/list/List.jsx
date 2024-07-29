import React, { useEffect, useState } from "react";
import "./list.css";
import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../context/Firebase";

function List() {
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [user,setUser]=useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.createListing(name, isbnNumber, price, coverPic);
      navigate("/");
      setName("");
      setIsbnNumber("");
      setPrice("");
      console.log("successfully added book data");
    } catch (error) {
      console.log("error during submitting the form", error);
    }
  };
  useEffect(()=>{
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
  
  if (user === null) return <p className="logout-message">U will be shown a form to add items in ur library...</p>;

  return (
    <div className="list-container">
      <div className="list-box">
        <div className="form-wrapper">
          <h1 className="form-title">Book Details...</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="booklist" className="form-label">
                Book Name
              </label>
              <input
                type="text"
                name="book"
                id="booklist"
                placeholder="Enter your Email"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordlist" className="form-label">
                ISBN No.
              </label>
              <input
                type="ISBN"
                name="ISBN"
                id="ISBNlist"
                placeholder="Enter your ISBN no"
                onChange={(e) => setIsbnNumber(e.target.value)}
                value={isbnNumber}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pricelist" className="form-label">
                Price
              </label>
              <input
                type="price"
                name="price"
                id="ISBNlist"
                placeholder="Enter book's price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="piclist" className="form-label">
                Select Cover-pic
              </label>
              <input
                type="file"
                name="file"
                id="piclist"
                onChange={(e) => setCoverPic(e.target.files[0])}
                required
                className="form-input"
                accept=".jpg,.jpeg,.png"
              />
            </div>
            <button type="submit" className="submit-button">
              Confirrm Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default List;
