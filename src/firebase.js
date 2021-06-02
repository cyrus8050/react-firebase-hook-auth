import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyAQV5PTu16ZlHNF1TnKG7zyvvD41t8PdSU",
    authDomain: "react-firebase-email-log-395b9.firebaseapp.com",
    projectId: "react-firebase-email-log-395b9",
    storageBucket: "react-firebase-email-log-395b9.appspot.com",
    messagingSenderId: "546756441964",
    appId: "1:546756441964:web:6cd390e6ae939ed8a3a549"
};
// Initialize Firebase
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db,auth , storage};
