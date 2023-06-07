// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, setDoc, doc} from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain:  import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId:  import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId:  import.meta.env.VITE_APP_ID,
  measurementId:  import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export const db = getFirestore();

const signUp = async (email, password, name, role) => {
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
      name: name,
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

const signUpNewUser = async (email, password, name, role) =>{
  const secondaryApp = initializeApp(firebaseConfig, "Secondary");
  const secondaryAuth = getAuth(secondaryApp);
  try{
    const newUserCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        password
    );

    const newUser = newUserCredential.user;

    const docRef = doc(db,"users", newUser?.uid);

    const data = {
      uid: newUser.uid,
      name: name,
      email: newUser.email,
      role: role,
    }

    await setDoc(docRef, data, { merge: true });

    return {
      success: true,
      user: newUser,
    };

  }
  catch(error){
    return {
      error: error.message,
    };
  }
  finally {
    await secondaryAuth.signOut()
  }
}

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

export default app;
export { auth, signIn, signUp, signUpNewUser, signout};
