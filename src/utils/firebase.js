// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
// import {getAnalytics} from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8DgGO7GfVwtPycr7IzgccQTCAT948j8Q",
    authDomain: "nutricore-384c6.firebaseapp.com",
    projectId: "nutricore-384c6",
    storageBucket: "nutricore-384c6.appspot.com",
    messagingSenderId: "1031764319951",
    appId: "1:1031764319951:web:0f4fc886433b32e329a1ba",
    measurementId: "G-MTZ7VSE86T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const firestore = getFirestore(app)

export {app, auth, firestore};
