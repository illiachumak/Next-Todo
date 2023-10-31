import { initializeApp } from "firebase/app";


export const firebaseConfig = {
  apiKey: "AIzaSyCKLu_8QGMgSMerUQOJSrbdfWbjndj3ylE",
  authDomain: "todo-709ab.firebaseapp.com",
  databaseURL: "https://todo-709ab-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-709ab",
  storageBucket: "todo-709ab.appspot.com",
  messagingSenderId: "987939363807",
  appId: "1:987939363807:web:d949fd550812be0b21826a",
  measurementId: "G-JCH1LPZ1DN"
};

export const app = initializeApp(firebaseConfig);
