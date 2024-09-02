import axios from "axios";
import jwtDecode from "jwt-decode";
const url_base = import.meta.env.VITE_URL_API_BASE;
const url = `${url_base}/filiais`;

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

export const cadastrarFilial = (values) =>
    new Promise((resolve, reject) => {
        axios
            .post(url, {
                Endereco: {
                    cidade: values.Endereco.cidade,
                    logradouro: values.Endereco.logradouro,
                    bairro: values.Endereco.bairro,
                    numero: values.Endereco.numero,
                    complemento: values.Endereco.complemento,
                    cep: values.Endereco.cep,
                    estado: values.Endereco.estado,
                    uf: values.Endereco.uf,
                },
                id_empresa: values.id_empresa,
                codigo: values.codigo,
                nome: values.nome,
            })
            .then((resp) => resolve(resp))
            .catch((error) => reject(error));
    });

export const buscarTodasFiliais = (
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
                    reject("Filial não encontrada.");
                }
            })
            .catch((error) => reject(error));
    });

export const buscaFilialById = (id) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${url}/${id}`)
            .then((resp) => {
                if (resp && resp.data) {
                    resolve(resp.data);
                } else {
                    reject("Filial não encontrada.");
                }
            })
            .catch((error) => reject(error));
    });

export const alterarFilial = (filial_id, filial) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${url}/${filial_id}`, filial)
            .then((resp) => resolve(resp))
            .catch((error) => reject(error));
    });