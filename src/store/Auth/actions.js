import { auth, fireAuth } from "src/boot/firebase";
import { Loading, LocalStorage } from "quasar";
import {
  showMessageError,
  showMessageSucess,
} from "src/functions/show-messaes";

export function loginUser({commit}, payload) {
  Loading.show();
  fireAuth
    .signInWithEmailAndPassword(auth, payload.email, payload.password)
    .then((userCredential) => {
      showMessageSucess("Usuario loagado!, Seja bem vindo!!");
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push("/");
      }
    })
    .catch((error) => {
      Loading.hide();
      if (error.code == "auth/user-not-found") {
        showMessageError(error.message);
      } else {
        showMessageError(error.message);
      }
    });
}

export function registerUser({ commit }, payload) {
  Loading.show();
  fireAuth
    .createUserWithEmailAndPassword(auth, payload.email, payload.password)
    .then((userCredential) => {
      showMessageSucess("Usuario registrado!, faça login.");
      this.$router.push("/index");
    })
    .catch((error) => {
      Loading.hide();
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
export function logoutUser({ dispatch }) {
  Loading.show();
  fireAuth
    .signOut(auth)
    .then(() => {
      showMessageSucess("Usuario deslogado!");
    })
    .catch((error) => {
      Loading.hide();
      showMessageError(error.message);
    });
}

export function handleAuthStateChange({ commit, dispatch }) {
  fireAuth.onAuthStateChanged(auth, (user) => {
    Loading.hide();
    if (user) {
      if (LocalStorage.getItem('user') === null) {
        LocalStorage.set("user", user);
      }

      dispatch("setUsuario", user);
      commit("setLoggedIn", true);
      LocalStorage.set("loggedIn", true);

      dispatch("senhas/fbReadData", null, { root: true });

      dispatch('validarRouter', '/')
    } else {
      LocalStorage.set("user", null);
      commit("senhas/clearSenhas", null, { root: true });

      LocalStorage.set("loggedIn", false);
      commit("setLoggedIn", false);
      
      dispatch("setUsuario", null);

      dispatch('validarRouter', "/auth")
    }
  });
}

export function validarRouter({ commit }, rota) {
  if (this.$router.currentRoute.path !== rota) {
    this.$router.push(rota);
  }
}