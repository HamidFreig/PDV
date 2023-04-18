import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhq1qHKhf3QcYJK1Y5hDUBH74UJ1uBEGM",
    authDomain: "proyecto-titulo-pdv.firebaseapp.com",
    projectId: "proyecto-titulo-pdv",
    storageBucket: "proyecto-titulo-pdv.appspot.com",
    messagingSenderId: "645124912076",
    appId: "1:645124912076:web:b9053ebda7ec55c8e72369",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
