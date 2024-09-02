import axios from "axios";
import jwtDecode from "jwt-decode";
const url_base = import.meta.env.VITE_URL_API_BASE;
const url = `${url_base}/cargos`;

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

export const cadastrarCargo = (values) =>
    new Promise((resolve, reject) => {
        axios
            .post(url, {
                codigo: values.codigo,
                cargo: values.cargo
            })
            .then((resp) => resolve(resp))
            .catch((error) => reject(error));
    });

export const buscarTodosCargos = (
    filtro = "",
    colunaOrdem = "",
    ordem = "",
    limit = null,
    offset = null,
    id_filial = null
) =>
    new Promise((resolve, reject) => {
        const token = localStorage.getItem("app-token");
        const payload = token ? jwtDecode(token) : "";
        console.log(payload);
        let url_montado = `${url}?id_filial=${id_filial ? id_filial : payload.id_filial
            }&`;

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
            .get(`${url_montado}`)
            .then((resp) => {
                if (resp.data) {
                    resolve(resp.data);
                } else {
                    reject("Cargos não encontrados.");
                }
            })
            .catch((error) => reject(error));
    });

export const buscaCargoById = (id) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${url}/${id}`)
            .then((resp) => {
                if (resp && resp.data) {
                    resolve(resp.data);
                } else {
                    reject("Cargo não encontrado.");
                }
            })
            .catch((error) => reject(error));
    });

export const alterarCargo = (cargo_id, cargo) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${url}/${cargo_id}`, cargo)
            .then((resp) => resolve(resp))
            .catch((error) => reject(error));
    });