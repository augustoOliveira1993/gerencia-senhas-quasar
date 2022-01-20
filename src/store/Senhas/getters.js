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

export function senhasFieldered(state, getters) {
  let senhasSorted = getters.senhasSorted;
  let senhasField = {};

  if (state.search) {
    Object.keys(senhasSorted).forEach((key) => {
      let senha = senhasSorted[key],
        senhasPlataformaCase = senha.plataforma.toLowerCase(),
        searchLowerCase = state.search.toLowerCase();
      if (senhasPlataformaCase.toLowerCase().includes(searchLowerCase)) {
        senhasField[key] = senha;
      }
    });
    return senhasField;
  }
  return senhasSorted;
}

export function senhasSorted(state) {
  let senhasSorted = {},
    keysOrdered = Object.keys(state.senhas);
  keysOrdered.sort((a, b) => {
    let senhaAProp = state.senhas[a][state.sort].toLowerCase(),
      senhaBProp = state.senhas[b][state.sort].toLowerCase();
    if (senhaAProp > senhaBProp) return 1;
    else if (senhaAProp < senhaBProp) return -1;
    else return 0;
  });

  keysOrdered.forEach((key) => {
    senhasSorted[key] = state.senhas[key];
  });

  return senhasSorted;
}
