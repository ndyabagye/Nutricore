// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, setDoc, collection, doc, getDoc, query, where } from "@firebase/firestore";

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
  measurementId: "G-MTZ7VSE86T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore();

const signUp = async (email, password, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const docRef = doc(db,"users", user?.uid);

    const data = {
      uid: user.uid,
      email: user.email,
      role: role,
    }

    await setDoc(docRef, data, { merge: true });

    return {
      success: true,
      user: user,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return {
      success: true,
      user: user,
    };
  } catch (error) {
    return { error: error.message };
  }
};

const signout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return false;
  }
};

export { auth, db, signIn, signUp, signout, doc, getDoc, collection , query, where};
