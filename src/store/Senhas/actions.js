import { uid } from "quasar";
import { auth, db, fireDb } from "src/boot/firebase";
import {
  showMessageError,
  showMessageSucess,
} from "src/functions/show-messaes";

export function setSearch({ commit }, value) {
  commit("setSearch", value);
}

export function updateSenha({ dispatch }, payload) {
  dispatch("fbUpdateSenha", payload);
}

export function deleteSenha({ dispatch }, id) {
  dispatch("fbDeleteSenha", id);
}

export function addSenha({ dispatch }, senha) {
  let senhaId = uid();
  let payload = {
    id: senhaId,
    senha: senha,
  };
  dispatch("fbAddSenha", payload);
}

export function fbReadData({ commit, state }) {
  let userId = auth.currentUser.uid;
  let data = fireDb.ref(db, `senhas/${userId}`);

  // initial check for data
  fireDb.onValue(data, (snap) => {
    commit("setSenhasDownloaded", true);
  });

  // Child added
  fireDb.onChildAdded(data, (snap) => {
    let senha = snap.val();

    let payload = {
      id: snap.key,
      senha: senha,
    };
    commit("addSenha", payload);
  });

  // Child changed
  fireDb.onChildChanged(data, (snap) => {
    let senha = snap.val();

    let payload = {
      id: snap.key,
      updates: senha,
    };

    commit("updateSenha", payload);
  });

  // child remover
  fireDb.onChildRemoved(data, (snap) => {
    let senhaId = snap.key;
    commit("deleteSenha", senhaId);
  });
}

export function fbAddSenha({}, payload) {
  let userId = auth.currentUser.uid;
  let data = fireDb.ref(db, `senhas/${userId}/${payload.id}`);

  fireDb
    .set(data, payload.senha)
    .then(() => {
      showMessageSucess("Senha Adicionada com sucesso!");
    })
    .catch((error) => {
      showMessageError(error.message);
    });
}

export function fbUpdateSenha({}, payload) {
  let userId = auth.currentUser.uid;
  let data = firebaseDb.ref(db, `senhas/${userId}/${payload.id}`);
  fireDb.update(data, payload.updates).then(() => {
    showMessageSucess("Senha Updated!");
  });
}

export function fbDeleteSenha({}, senhaId) {
  let userId = auth.currentUser.uid;
  let data = firebaseDb.ref(db, `senhas/${userId}/${senhaId}`);
  firebaseDb.remove(data).then(() => {
    showMessageError("Tasks deletada com sucesso!");
  });
}
