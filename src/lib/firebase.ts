import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCY1HiA4TRORkASJTVPeQlsRTATf02CoJI",
  authDomain: "medoune-camara-portfolio.firebaseapp.com",
  projectId: "medoune-camara-portfolio",
  storageBucket: "medoune-camara-portfolio.firebasestorage.app",
  messagingSenderId: "628790578256",
  appId: "1:628790578256:web:d266f0d0fe050c5ad31555"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
