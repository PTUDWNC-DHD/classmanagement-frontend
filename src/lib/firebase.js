import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASxBfZvcc04eGiq56x6sjwp2FaPIAJhQQ",
  authDomain: "classroom-bb0ac.firebaseapp.com",
  projectId: "classroom-bb0ac",
  storageBucket: "classroom-bb0ac.appspot.com",
  messagingSenderId: "775622723505",
  appId: "1:775622723505:web:db5ee67fba9e7c529f1f90",
  measurementId: "G-529TH3RXDF"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
