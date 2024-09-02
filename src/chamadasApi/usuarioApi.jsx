import axios from "axios";
import jwtDecode from "jwt-decode";
const url_base = import.meta.env.VITE_URL_API_BASE;
const url = `${url_base}/usuarios`;
const token = localStorage.getItem("app-token");
const refreshToken = localStorage.getItem("refresh-token");
const payload = token !== null ? jwtDecode(token) : "";

const valorFiltro = (url, filtro) => {
  let urlMontado = url;
  if (filtro) {
    const filtroValue = Array.isArray(filtro.value)
      ? `[${filtro.value}]`
      : filtro.value;
    const filtroOperator =
      filtro.operator === "isAnyOf" ? "in" : filtro.operator;

    console.log("O filtro value é", "&value=" + filtroValue);
    urlMontado = urlMontado + "filtro=1&";
    urlMontado = urlMontado + "field=" + filtro.field + "&";
    urlMontado = urlMontado + "operator=" + filtroOperator + "&";
    urlMontado = urlMontado + "value=" + filtroValue + "&";
    return urlMontado;
  } else {
    return url;
  }
};

export const autentica = (login, senha) => {
  return new Promise((resolve, reject) => {
    const auth = btoa(`${login}:${senha}`);
    axios
      .post(
        `${url}/autentica/`,
        {},
        { headers: { Authorization: `Basic ${auth}` } }
      )
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          resolve(resp.data);
        } else {
          console.log(resp);
          reject(resp.data.result);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const autenticaComFilial = (id_filial, login, senha) =>
  new Promise((resolve, reject) => {
    const auth = btoa(`${login}:${senha}`);
    axios
      .post(
        `${url}/autentica/${id_filial}`,
        {},
        { headers: { Authorization: `Basic ${auth}` } }
      )
      .then((resp) => {
        if (resp.status === 200) {
          resolve(resp.data);
        } else {
          reject(resp.data.result);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });

export const atualizaToken = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/atualiza_token`, {
        refreshToken,
        id_filial: payload ? payload.id_filial : null,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/logout`)
      .then((resp) => {
        if (resp.status === 204) {
          resolve(resp.data);
        } else {
          reject(resp.data.result);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const cadastrarUsuario = (values) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${url}`, {
        codigo: values.codigo,
        login: values.login,
        id_filial: payload.id_filial,
        id_empresa: payload.id_empresa,
        // id_licenca: values.id_licenca,
        nome: values.nome,
        senha: values.senha,
        filiais: values.filiais
      })
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });

export const buscarTodosUsuarios = (
  filtro = "",
  colunaOrdem = "",
  ordem = "",
  limit = null,
  offset = null
) =>
  new Promise((resolve, reject) => {
    let url_montado = `${url}?`;

    if (limit) {
      offset = offset * limit;

      url_montado = url_montado + "limit=" + limit + "&offset=" + offset + "&";
    }

    if (filtro) {
      url_montado = valorFiltro(url_montado, filtro);
    }

    if (colunaOrdem) {
      url_montado = url_montado + "coluna=" + colunaOrdem + "&";
    }

    if (ordem) {
      url_montado = url_montado + "order=" + ordem;
    }

    axios
      .get(url_montado)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject("Usuários não encontrados.");
        }
      })
      .catch((error) => reject(error));
  });

export const buscaUsuarioById = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${url}/${id}`)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject("Usuário não encontrado.");
        }
      })
      .catch((error) => reject(error));
  });

export const alterarUsuario = (usuario_id, usuario) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${url}/${usuario_id}`, usuario)
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });