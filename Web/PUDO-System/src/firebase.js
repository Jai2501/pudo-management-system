// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5e_Z7fGZowioMEBe4m17PeDHmjssyJjY",
    authDomain: "pudo-ridehailing-ms.firebaseapp.com",
    projectId: "pudo-ridehailing-ms",
    storageBucket: "pudo-ridehailing-ms.appspot.com",
    messagingSenderId: "599605407758",
    appId: "1:599605407758:web:ef14e0fa22f33c5afc4c5f",
    databaseURL: "https://pudo-ridehailing-ms-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default app;
export default database;