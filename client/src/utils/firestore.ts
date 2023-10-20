import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBU9CRwVScJI4J9CEAOeDyabpkYia1OfzM",
    authDomain: "voting-system-1e1e6.firebaseapp.com",
    projectId: "voting-system-1e1e6",
    storageBucket: "voting-system-1e1e6.appspot.com",
    messagingSenderId: "618915188505",
    appId: "1:618915188505:web:f6094cb5179bda9528ff88"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
