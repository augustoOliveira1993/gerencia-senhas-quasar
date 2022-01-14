import { auth, fireAuth } from "src/boot/firebase";

export function loginUser({}, payload) {
  fireAuth
    .signInWithEmailAndPassword(auth, payload.email, payload.password)
    .then((userCredential) => {
      console.log("Usuario logado");
    })
    .catch((error) => {
      if (error.code == "auth/user-not-found") {
      } else {
      }
    });
}
