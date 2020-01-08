import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAn2dW0oUiDwV9Iac-6AKPyp3AJjaBy9ww",
    authDomain: "crwn-db-93c5a.firebaseapp.com",
    databaseURL: "https://crwn-db-93c5a.firebaseio.com",
    projectId: "crwn-db-93c5a",
    storageBucket: "crwn-db-93c5a.appspot.com",
    messagingSenderId: "710126089949",
    appId: "1:710126089949:web:4ee89b09562e075a4f4d34"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;