import axios from "axios";

export const buscaCep = (cep) =>
    new Promise((resolve, reject) => {
      axios
        .get(`https://viacep.com.br/ws/${cep}/json`)
        .then((resp) => {
          if (resp && resp.data) {
            resolve(resp.data);
          } else {
            reject("CEP não encontrado.");
          }
        })
        .catch((error) => reject(error));
    });