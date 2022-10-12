// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrAG__yuvh7BCJze0_hmXqALvNBqgLVic",
    authDomain: "routine-tracker-36b22.firebaseapp.com",
    projectId: "routine-tracker-36b22",
    storageBucket: "routine-tracker-36b22.appspot.com",
    messagingSenderId: "5874223880",
    appId: "1:5874223880:web:c16aaa9c57226629bf3abd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }  
