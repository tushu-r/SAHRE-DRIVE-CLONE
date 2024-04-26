import firebase from "firebase" ;



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDVeFOlFY_6jKg6L19XTTQEta3MvaQ9bQ0",
    authDomain: "drive-498d9.firebaseapp.com",
    projectId: "drive-498d9",
    storageBucket: "drive-498d9.appspot.com",
    messagingSenderId: "561768826323",
    appId: "1:561768826323:web:d832d33111d387f81c9b26",
    measurementId: "G-JWYFZ41NPJ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig) ;

   
  const db = firebaseApp.firestore() ;

  const storage = firebase.storage() ;
  const auth = firebase.auth() ;
  const provider = new firebase.auth.GoogleAuthProvider() ;


export { db , storage , auth ,provider  } ;