/** @format */

import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/firestore';

const config = {
  apiKey: 'AIzaSyDcOv99qoA_yxIP3ZTu7JIJaP0JWMGKyz8',
  authDomain: 'react-firebase-puppygram.firebaseapp.com',
  projectId: 'react-firebase-puppygram',
  storageBucket: 'react-firebase-puppygram.appspot.com',
  messagingSenderId: '244710494009',
  appId: '1:244710494009:web:a6a78ba08adae0df9e62e8',
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
