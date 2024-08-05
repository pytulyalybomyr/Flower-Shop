import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCBnNpngicdLmtxO0AeHBEEu3LeAk8_Ggw",
    authDomain: "lybomyr-pytulya.firebaseapp.com",
    projectId: "lybomyr-pytulya",
    storageBucket: "lybomyr-pytulya.appspot.com",
    messagingSenderId: "950762709079",
    appId: "1:950762709079:web:164b7522e35d608f960312"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Ініціалізація Firebase Authentication
const auth = getAuth(app);

const storage = getStorage(app)

// Ініціалізація Firestore
const db = getFirestore(app);

export { auth, db, storage };