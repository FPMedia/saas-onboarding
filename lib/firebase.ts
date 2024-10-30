import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsTdNv7od3AJrPJHRPx5I2i4wedbfAavM",
  authDomain: "new-software-7fea6.firebaseapp.com",
  projectId: "new-software-7fea6",
  storageBucket: "new-software-7fea6.appspot.com",
  messagingSenderId: "578322634400",
  appId: "1:578322634400:web:cc53cd71a175e243b51bc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 