// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyD1q3sPb-5R3UP-_vDxyQ3wF0l_TIoHS8E",
    authDomain: "instagram-clone-76c99.firebaseapp.com",
    databaseURL: "https://instagram-clone-76c99.firebaseio.com",
    projectId: "instagram-clone-76c99",
    storageBucket: "instagram-clone-76c99.appspot.com",
    messagingSenderId: "226767340752",
    appId: "1:226767340752:web:2dde52ddec5eb0fef88ad5",
    measurementId: "G-TNJBSKBK2Q"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage(); 


export { db, auth, storage };