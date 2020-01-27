import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDHgLjXulZgCfYiPITkiQJm-gO7D-BM-JY",
    authDomain: "alapaca-27a50.firebaseapp.com",
    databaseURL: "https://alapaca-27a50.firebaseio.com",
    projectId: "alapaca-27a50",
    storageBucket: "alapaca-27a50.appspot.com",
    messagingSenderId: "472497466214",
    appId: "1:472497466214:web:b7c2ab36664c5e49c876a7",
    measurementId: "G-93ST38QH9Y"
  };


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
