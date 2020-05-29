import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD_Nq6rRJYQUUQ6MYEuQtlNfChNazmxTq4",
    authDomain: "crwn--db.firebaseapp.com",
    databaseURL: "https://crwn--db.firebaseio.com",
    projectId: "crwn--db",
    storageBucket: "crwn--db.appspot.com",
    messagingSenderId: "867099480427",
    appId: "1:867099480427:web:ab5506dc8974df0dadfc2e",
    measurementId: "G-YVX27QYVG0"
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