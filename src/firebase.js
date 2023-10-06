// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0yxDVJk9Io8JCvc_jV5WYtzVeWN1PW40",
  authDomain: "printjob-1c832.firebaseapp.com",
  projectId: "printjob-1c832",
  storageBucket: "printjob-1c832.appspot.com",
  messagingSenderId: "170232948293",
  appId: "1:170232948293:web:77d3106008aba3429be52c",
  measurementId: "G-BQPFHZKV8H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app)