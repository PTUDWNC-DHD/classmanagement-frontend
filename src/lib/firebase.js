import firebase from "firebase";

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

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider }
