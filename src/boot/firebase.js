import * as firebase from "firebase/app";
import * as firebaseAuth from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAlGZU303EFl0se4NOGXb5Fmf44D2lAmY4",
  authDomain: "gerencia-senhas.firebaseapp.com",
  projectId: "gerencia-senhas",
  storageBucket: "gerencia-senhas.appspot.com",
  messagingSenderId: "113374633121",
  appId: "1:113374633121:web:e3b32907d1426b50d9e4e0",
  measurementId: "G-8FJQY76C5G",
};

firebase.initializeApp(firebaseConfig);
const auth = firebaseAuth.getAuth();
const fireAuth = firebaseAuth;
export { fireAuth, auth };
