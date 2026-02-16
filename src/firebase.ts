import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdYhIx3OCeZJ9M0Zbd6njP9xwzz7p8pgo",
  authDomain: "medicare-companion-9cb7c.firebaseapp.com",
  projectId: "medicare-companion-9cb7c",
  storageBucket: "medicare-companion-9cb7c.firebasestorage.app",
  messagingSenderId: "523811900805",
  appId: "1:523811900805:web:299a8378ba73de0b4e48ec",

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
