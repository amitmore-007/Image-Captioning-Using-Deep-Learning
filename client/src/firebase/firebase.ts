import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";    

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "snapcaption-2ae6c.firebaseapp.com",
  projectId: "snapcaption-2ae6c",
  storageBucket: "snapcaption-2ae6c.firebasestorage.app",
  messagingSenderId: "430928467700",
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, inMemoryPersistence);
export { app, auth };