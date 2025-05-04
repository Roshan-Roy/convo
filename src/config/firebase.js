import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAsfEOdS7fD_IRT6hy2OO5mORZhcRDHwag",
  authDomain: "fir-course-2b438.firebaseapp.com",
  projectId: "fir-course-2b438",
  storageBucket: "fir-course-2b438.firebasestorage.app",
  messagingSenderId: "856895515012",
  appId: "1:856895515012:web:deb6a1a5a2ce4232a215d1",
  measurementId: "G-8D90Z6N7Y2"
};
  
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)   
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)