import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBQSD4YDvYSZ7BzauzXRa4zuRn9NJTL0z4",
  authDomain: "barrafut-dc3d5.firebaseapp.com",
  projectId: "barrafut-dc3d5",
  storageBucket: "barrafut-dc3d5.appspot.com",
  messagingSenderId: "332263404514",
  appId: "1:332263404514:web:ed7b75d615707566a43fbb",
  measurementId: "G-P891LQ0Z2J"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {auth}