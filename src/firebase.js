import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// import { useEffect } from 'react';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import {SignInWithGoogle} from 'firebase';
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2l1YXTEGDh8hWJOnvvZ5BUIehEkOdqBs",
  authDomain: "classroomclone-caeb7.firebaseapp.com",
  projectId: "classroomclone-caeb7",
  storageBucket: "classroomclone-caeb7.appspot.com",
  messagingSenderId: "215612406762",
  appId: "1:215612406762:web:7d0a44158800dd51d75093",
  measurementId: "G-WF1J7P9099"
};

// Initialize Firebase


const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();



const googleProvider = new firebase.auth.GoogleAuthProvider();

// Sign in and check or create account in firestore
const SignInWithGoogle = async () => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    console.log(response.user);
    const user = response.user;
    console.log(`User ID - ${user.uid}`);
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (querySnapshot.docs.length === 0) {
      // create a new user
      await db.collection("users").add({
        uid: user.uid,
        enrolledClassrooms: [],
      });
    }
  } catch (err) {
    alert(err.message);
  }
};
 

const Logout = () => {
  auth.signOut();
  
 
};
export { app, auth, db, SignInWithGoogle, Logout};