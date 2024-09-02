import axios from "axios";
import jwtDecode from "jwt-decode";
const url_base = import.meta.env.VITE_URL_API_BASE;
const url = `${url_base}/empresas`;

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

export const cadastrarEmpresa = (values) =>
    new Promise((resolve, reject) => {
        axios
            .post(url, {
                endereco: {
                    cidade: values.Endereco.cidade,
                    logradouro: values.Endereco.logradouro,
                    bairro: values.Endereco.bairro,
                    numero: values.Endereco.numero,
                    complemento: values.Endereco.complemento,
                    cep: values.Endereco.cep,
                    estado: values.Endereco.estado,
                    uf: values.Endereco.uf,
                },
                nome_fantasia: values.nome_fantasia,
                razao_social: values.razao_social,
                cnpj: values.cnpj,
            })
            .then((resp) => resolve(resp))
            .catch((error) => reject(error));
    });

export const buscarTodasEmpresas = (
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
                    reject("Empresa não encontrada.");
                }
            })
            .catch((error) => reject(error));
    });

export const buscaEmpresaById = (id) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${url}/${id}`)
            .then((resp) => {
                if (resp && resp.data) {
                    resolve(resp.data);
                } else {
                    reject("Empresa não encontrada.");
                }
            })
            .catch((error) => reject(error));
    });

export const alterarEmpresa = (empresa_id, empresa) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${url}/${empresa_id}`, empresa)
            .then((resp) => resolve(resp))
            .catch((error) => reject(error));
    });
