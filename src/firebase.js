// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtJfmPbLJogLiBmXM6Ba4ElJsfHHXRK3k",
  authDomain: "fir-auth-demo-91829.firebaseapp.com",
  projectId: "fir-auth-demo-91829",
  storageBucket: "fir-auth-demo-91829.appspot.com",
  messagingSenderId: "576630617539",
  appId: "1:576630617539:web:10063efa0d348d29d77976"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth}