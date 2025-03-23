import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDa941LRglsMdvpqo-g8S-yG_mh86mk7Vk",
  authDomain: "consoul-b13b6.firebaseapp.com",
  projectId: "consoul-b13b6",
  storageBucket: "consoul-b13b6.firebasestorage.app",
  messagingSenderId: "317518296580",
  appId: "1:317518296580:web:735c3f286d452cc9932751"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
