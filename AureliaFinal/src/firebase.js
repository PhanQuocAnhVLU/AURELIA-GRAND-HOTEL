import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDd1r07wcKlBO2PYt6_JGf2R0Ndx4xzuuU",
  authDomain: "aurelia-grand-hotel.firebaseapp.com",
  projectId: "aurelia-grand-hotel",
  storageBucket: "aurelia-grand-hotel.firebasestorage.app",
  messagingSenderId: "72938178344",
  appId: "1:72938178344:web:82131a5ba71e6db5b1f21d",
  measurementId: "G-G01YFNFG57"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const facebookProvider = new FacebookAuthProvider();


// Sign in with popup helper
export const signInWithProvider = async (provider, rememberMe = true) => {
  await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  const result = await signInWithPopup(auth, provider);
  return result;
};

export { signOut, onAuthStateChanged };
