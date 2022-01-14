import { auth, fireAuth } from "src/boot/firebase";
import { Loading } from "quasar";
export function loginUser({}, payload) {
  Loading.show();
  fireAuth
    .signInWithEmailAndPassword(auth, payload.email, payload.password)
    .then((userCredential) => {
      console.log("Usuario logado");
      this.$router.push("/index");
      Loading.hide();
    })
    .catch((error) => {
      if (error.code == "auth/user-not-found") {
      } else {
      }
    });
}
