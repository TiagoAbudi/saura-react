import axios from "axios";
//import jwtDecode from "jwt-decode";
const url_base = import.meta.env.VITE_URL_API_BASE;
//const url = `${url_base}/cadastro-feedback`;
const url = `${url_base}/processos`;
// const token = localStorage.getItem("app-token");
// const refreshToken = localStorage.getItem("refresh-token");
// const payload = token !== null ? jwtDecode(token) : "";

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

export const buscarTodosProcessos = (
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

export const buscaProcessoById = (id) =>
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

export const cadastrarIdentificacao = (values) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${url}`, {
        corretora: values.corretora,
        seguradora: values.seguradora,
        segurado: values.segurado,
        ramo: values.ramo,
        analista: values.analista,
        ativo: true,
      })
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });

export const atualizarIdentificacao = (id, values) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${url}/${id}`, {
        corretora: values.corretora,
        seguradora: values.seguradora,
        segurado: values.segurado,
        ramo: values.ramo,
        analista: values.analista,
      })
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });

export const atualizarSinistro = (idProcesso, values) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${url_base}/sinistros/${idProcesso}`, {
        data_ocorrencia: values.data_ocorrencia,
        cidade: values.cidade,
        uf: values.estado.uf,
        tipo_mercadoria: values.tipo_mercadoria,
        caracterizacao_ocorrencia: values.caracterizacao_ocorrencia,
      })
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });

export const buscarSinistroById = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${url_base}/sinistros/${id}`)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject("Sinistro não encontrado.");
        }
      })
      .catch((error) => reject(error));
  });

export const buscarAtendimentoById = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${url_base}/atendimentos/${id}`)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject("Atendimento não encontrado.");
        }
      })
      .catch((error) => reject(error));
  });

export const atualizarAtendimento = (idProcesso, values) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${url_base}/atendimentos/${idProcesso}`, {
        ...values,
      })
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });

export const buscarRelacionamentoById = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${url_base}/solicitacao-documentos/${id}`)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject("Relacionamento não encontrado.");
        }
      })
      .catch((error) => reject(error));
  });

export const atualizarRelacionamento = (idProcesso, values) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${url_base}/solicitacao-documentos/${idProcesso}`, {
        ...values,
      })
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });

export const buscarRelatorioById = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${url_base}/compartilhamento-relatorio/${id}`)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject("Compartilhamento de relatório não encontrado.");
        }
      })
      .catch((error) => reject(error));
  });

export const atualizarRelatorio = (idProcesso, values) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${url_base}/compartilhamento-relatorio/${idProcesso}`, {
        ...values,
      })
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });

export const buscarCertificadoVistoriaById = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${url_base}/certificado-vistoria/${id}`)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject("Certificado de vistoria não encontrado.");
        }
      })
      .catch((error) => reject(error));
  });

export const atualizarCertificadoVistoria = (idProcesso, values) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${url_base}/certificado-vistoria/${idProcesso}`, {
        ...values,
      })
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });

export const buscarFinanceiroById = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${url_base}/financeiros/${id}`)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject("Financeiro não encontrado.");
        }
      })
      .catch((error) => reject(error));
  });

export const atualizarFinanceiro = (idProcesso, values) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${url_base}/financeiros/${idProcesso}`, {
        ...values,
      })
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });
