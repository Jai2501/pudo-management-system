// Import the functions you need from the SDKs you need
// import firebase from "firebase/app"
// import "firebase/database"

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

// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const database = getDatabase(firebaseApp);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// function loadBerthData() {
//     console.log("Loading")

//     // const db = getDatabase();

//     console.log(database)

//     const liveBerthInfoRef = ref(database, 'berth-live-info');

//     console.log(liveBerthInfoRef)

//     onValue(liveBerthInfoRef, (snapshot) => {
//         console.log(snapshot)
        
//         const data = snapshot.val()
//         console.log(data)
//     })
// }

// export default loadBerthData;

export const berthA1 = "berth-a-1"
export const berthA2 = "berth-a-2"
export const berthA3 = "berth-a-3"
export const berthA4 = "berth-a-4"
export const berthPwd = "berth-pwd"

export const trafficStatus = "traffic-status"
export const humanCrowdStatus = "human-crowd-status"

export default app;
export { database };

// export default firebaseApp;
