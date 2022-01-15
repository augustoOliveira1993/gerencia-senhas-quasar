import { auth, fireAuth } from "src/boot/firebase";
import { Loading, LocalStorage } from "quasar";
import {
  showMessageError,
  showMessageSucess,
} from "src/functions/show-messaes";

export function loginUser({}, payload) {
  Loading.show();
  fireAuth
    .signInWithEmailAndPassword(auth, payload.email, payload.password)
    .then((userCredential) => {
      showMessageSucess("Usuario loagado!, Seja bem vindo!!");
      this.$router.push("/index");
    })
    .catch((error) => {
      if (error.code == "auth/user-not-found") {
        showMessageError(error.message);
      } else {
        showMessageError(error.message);
      }
    });
}

export function registerUser({}, payload) {
  Loading.show();
  fireAuth
    .createUserWithEmailAndPassword(auth, payload.email, payload.password)
    .then((userCredential) => {
      showMessageSucess("Usuario registrado!, faça login.");
      this.$router.push("/index");
    })
    .catch((error) => {
      if (error.code == "auth/user-not-found") {
        showMessageError(error.message);
      } else {
        showMessageError(error.message);
      }
    });
}
export function setUsuario({ commit }, user) {
  commit("setUsuario", user);
}
export function logoutUser() {
  Loading.show();
  fireAuth
    .signOut(auth)
    .then(() => {
      showMessageSucess("Usuario deslogado!");
    })
    .catch((error) => {
      showMessageError(error.message);
    });
}

export function handleAuthStateChange({ commit, dispatch }) {
  fireAuth.onAuthStateChanged(auth, (user) => {
    Loading.hide();
    if (user) {
      LocalStorage.set("user", user);
      dispatch("setUsuario", user);
      commit("setLoggedIn", true);
      LocalStorage.set("loggedIn", true);
      this.$router.push("/");
    } else {
      LocalStorage.set("user", null);
      commit("setLoggedIn", false);
      dispatch("setUsuario", null);
      LocalStorage.set("loggedIn", false);
      this.$router.replace("/auth");
    }
  });
}
