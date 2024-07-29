import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  fetchSignInMethodsForEmail,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import {
  Firestore,
  getFirestore,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  collection,
  where,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { sendPasswordResetEmail as firebaseSendPasswordResetEmail } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: "AIzaSyDOyl40X13727Pp6ffrt-fqJ1sU7Z3CEKE",
  authDomain: "bookytore.firebaseapp.com",
  projectId: "bookytore",
  storageBucket: "bookytore.appspot.com",
  messagingSenderId: "526697782987",
  appId: "1:526697782987:web:ffd3d106d25cc8630dc54e",
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  // const navigate=useNavigate()
  useEffect(() => {
    onAuthStateChanged(
      firebaseAuth,
      (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      },
      []
    );
  });

  const registerWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return userCredential; // Return the userCredential object
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.error("The email address is already in use by another account.");
        alert("The email address is already in use by another account.");
      } else {
        console.error("Error signing up:", error.message);
      }
      throw error; // Throw error to be caught in the calling function
    }
  };
  

  const signInUser = async (email, password) => {
    if (!email || !password) {
      console.error("Email and password must be provided.");
      return;
    }
  
    try {
      // Ensure the password is updated and user is reauthenticated
      const signInResult = await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log("User signed in successfully:", signInResult.user);
      return signInResult;
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          console.error("Incorrect password.");
          break;
        case "auth/user-not-found":
          console.error("No user found with this email.");
          break;
        case "auth/invalid-credential":
          console.error("Invalid credentials provided.");
          break;
        case "auth/network-request-failed":
          console.error("Network error. Please check your internet connection.");
          break;
        default:
          console.error("Error signing in:", error.message);
      }
    }
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      await firebaseSendPasswordResetEmail(firebaseAuth, email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  };
  
  

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(
        firebaseAuth,
        googleProvider
      );
      if (userCredential && userCredential.user) {
        return userCredential; // Return the userCredential to handle in the calling function
      } else {
        throw new Error("Unexpected response from Google sign-in.");
      }
    } catch (error) {
      console.log("Error signing in with Google", error);
      throw error; // Throw error to handle in the calling function
    }
  };
  const getSignInMethodsForEmail = async (email) => {
    try {
      return await fetchSignInMethodsForEmail(firebaseAuth, email);
     
    } catch (error) {
      throw error;
    }
  };


  const reauthenticateUser = async (user, credential) => {
    try {
      await reauthenticateWithCredential(user, credential);
      console.log("User reauthenticated successfully.");
    } catch (error) {
      console.error("Error re-authenticating user:", error);
    }
  };
  
  const updateUserPassword = async (newPassword) => {
    const user = firebaseAuth.currentUser; // Get the currently signed-in user
  
    if (!user) {
      throw new Error("No user is currently signed in.");
    }
  
    if (!newPassword || newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }
  
    try {
      await updatePassword(user, newPassword);
      console.log("Password updated successfully.");
  
      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(user.email, newPassword);
      await reauthenticateUser(user, credential);
    } catch (error) {
      console.error("Error updating password:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };
  
  const isLoggedIn = user ? true : false;

  const createListing = async (name, isbnNumber, price, coverPic) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-{coverPic.name}`
    );
    try {
      const picUploaded = await uploadBytes(imageRef, coverPic);
      return await addDoc(collection(firestore, "books"), {
        name,
        isbnNumber,
        price,
        imageUrl: picUploaded.ref.fullPath,
        userId: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        // photoURL:user.photoURL
      });
    } catch (error) {
      console.log("error in listing items in firebase ", error);
    }
  };

  const getAllBooks = async () => {
    try {
      return await getDocs(collection(firestore, "books"));
    } catch (error) {
      console.log("error getting books from library", error);
    }
  };

  const getBookById = async (id) => {
    try {
      const bookRef = doc(firestore, "books", id);
      const res = await getDoc(bookRef);
      return res;
    } catch (error) {
      console.log("error getting book by id", error);
    }
  };
  const getImageUrl = async (path) => {
    try {
      const fileRef = ref(storage, path);

      const url = await getDownloadURL(fileRef);

      return url;
    } catch (error) {
      console.error("Error getting download URL:", error);

      return null;
    }
  };

  const placeOrder = async (bookId, qty) => {
    try {
      // Reference to the specific book
      const bookRef = doc(firestore, "books", bookId);
      const bookSnap = await getDoc(bookRef);

      if (!bookSnap.exists()) {
        throw new Error("Book not found.");
      }

      // Get book details
      const bookData = bookSnap.data();
      const bookName = bookData.name;

      // Reference to the orders subcollection for the specific book
      const collectionRef = collection(firestore, "books", bookId, "orders");

      // Add the order with the book's name
      const result = await addDoc(collectionRef, {
        userId: user.uid,
        userEmail: user.email,
        qty: Number(qty),
        bookName: bookName,
      });

      return result;
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const getMyOrders = async () => {
    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    try {
      // Create a reference to the books collection
      const booksCollectionRef = collection(firestore, "books");
      const booksSnapshot = await getDocs(booksCollectionRef);

      // Initialize an array to store the orders with book details
      const allOrdersWithBookDetails = [];

      // Loop through each book to get its orders
      for (const bookDoc of booksSnapshot.docs) {
        const bookId = bookDoc.id;
        const ordersCollectionRef = collection(
          firestore,
          `books/${bookId}/orders`
        );
        const ordersSnapshot = await getDocs(ordersCollectionRef);

        // Get book details
        const bookData = bookDoc.data();

        // Filter orders by the current user's ID and combine with book details
        ordersSnapshot.docs.forEach((orderDoc) => {
          if (orderDoc.data().userId === user.uid) {
            allOrdersWithBookDetails.push({
              ...orderDoc.data(), // Order data
              id: orderDoc.id, // Order ID
              book: bookData,
              bookId: bookId, // Book details
              quantity: orderDoc.data().qty, // Quantity purchased
            });
          }
        });
      }

      return allOrdersWithBookDetails;
    } catch (error) {
      console.error("Error getting my orders:", error);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        registerWithEmailAndPassword,
        signInUser,
        signInWithGoogle,
        isLoggedIn,
        createListing,
        getAllBooks,
        getImageUrl,
        getBookById,
        placeOrder,
        getMyOrders,
        user,
        getSignInMethodsForEmail,
        updateUserPassword,
        sendPasswordResetEmail
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
