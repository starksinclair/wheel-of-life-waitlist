import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjU7bdqrRjyrUiLYZdZ7ZksnIh-1qAUuM",
  authDomain: "wheel-of-life-6e45c.firebaseapp.com",
  projectId: "wheel-of-life-6e45c",
  storageBucket: "wheel-of-life-6e45c.appspot.com",
  messagingSenderId: "565807877043",
  appId: "1:565807877043:web:8cc36062bb20fe5d1759c6",
  measurementId: "G-249STWMEKQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
