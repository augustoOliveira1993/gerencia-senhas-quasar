export function senhas(state, getters) {
  let senhasFieldered = getters.senhasFieldered;
  let senhas = [];
  Object.keys(senhasFieldered).forEach((key) => {
    let senha = senhasFieldered[key];
    senha.id = key;
    senhas.push(senhasFieldered[key]);
  });

  return senhas;
}

export function senhasFieldered(state) {
  let senhasFielderd = state.senhas;
  let senhasFieldered = [];
  if (state.search) {
    Object.keys(state.senhas).forEach((key) => {
      let senhaSearch = senhasFielderd[key].plataforma.toLowerCase();
      let searchSenhas = state.search.toLowerCase();
      if (senhaSearch.include(searchSenhas)) {
        senhasFieldered.id = key;
        senhasFieldered.push(senhasFielderd[key]);
        console.log();
      }
    });
    return senhasFieldered;
  }
  return state.senhas;
}
