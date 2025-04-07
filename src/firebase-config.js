// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyDAkoveArTIaBjctEZLuAmnd994X5-H-eI",
    authDomain: "joggr-d52d7.firebaseapp.com",
    projectId: "joggr-d52d7",
    storageBucket: "joggr-d52d7.firebasestorage.app",
    messagingSenderId: "769547588762",
    appId: "1:769547588762:web:47228fc4a29213b828bb23",
    measurementId: "G-1KPMSZ4FBB"
  };


// Initialize Firebase and export services
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);