import Vue from "vue";

export function setSearch(state, value) {
  state.search = value;
}

export function clearSenhas(state) {
  state.senhas = {};
}

export function setSenhasDownloaded(state, value) {
  state.senhasDownloaded = value;
}
export function addSenha(state, payload) {
  Vue.set(state.senhas, payload.id, payload.senha);
}

export function updateSenha(state, payload) {
  Object.assign(state.senhas[payload.id], payload.updates);
}

export function deleteSenha(state, id) {
  Vue.delete(state.senhas, id);
}
