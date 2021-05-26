import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/storage";
import "@firebase/firestore";

const config = {
  apiKey: "AIzaSyDGzTgPsG0FStItQ7ppelV3S-yB4m86cGI",
  authDomain: "instagram-clone-app-ebf8a.firebaseapp.com",
  projectId: "instagram-clone-app-ebf8a",
  storageBucket: "instagram-clone-app-ebf8a.appspot.com",
  messagingSenderId: "42253588690",
  appId: "1:42253588690:web:d5c66cc81cf62c6012750b"
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
