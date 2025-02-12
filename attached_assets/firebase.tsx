 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,setPersistence,browserSessionPersistence} from "firebase/auth";    
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArAXaSPXOgZu7DjMnUaCPSLakX9jtcILs",
  authDomain: "snapcaption-2ae6c.firebaseapp.com",
  projectId: "snapcaption-2ae6c",
  storageBucket: "snapcaption-2ae6c.firebasestorage.app",
  messagingSenderId: "430928467700",
  appId: "1:430928467700:web:4dadbd555281f8d3ee70a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
setPersistence(auth, browserSessionPersistence);
export{app,auth}; 