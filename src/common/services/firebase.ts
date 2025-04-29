import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAihzDoWtojItOcHn55UDozI9QfuoPsDyQ",
  authDomain: "maisha-pesa-1.firebaseapp.com",
  projectId: "maisha-pesa-1",
  storageBucket: "maisha-pesa-1.firebasestorage.app",
  messagingSenderId: "507368639599",
  appId: "1:507368639599:web:93ae1546f378946962119a",
  measurementId: "G-CQFX2YC71W",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
