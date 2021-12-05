import { useState, useEffect } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUPtYkzDoTwhiTS5A1IOhHj4LE0_YwSfw",
  authDomain: "travel-d29d3.firebaseapp.com",
  projectId: "travel-d29d3",
  storageBucket: "travel-d29d3.appspot.com",
  messagingSenderId: "397864073567",
  appId: "1:397864073567:web:cee3ce284b554165b79eea",
  measurementId: "G-0BXF0ELTYF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

// export const useAuth = () => {
//   const [currentUser, setCurrentUser] = useState([]);
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const q = query(userCollectionRef, where("uid", "==", user.uid));
//         const querySnapshot = await getDocs(q);
//         const adminUser =
//           querySnapshot.docs[0] !== undefined
//             ? querySnapshot.docs[0].data()
//             : [];
//         setCurrentUser(adminUser);
//       } else {
//         setCurrentUser(user);
//       }
//     });

//     return unsub;
//   }, []);
//   return currentUser;
// };

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
};

export const logOut = () => {
  return signOut(auth);
};
