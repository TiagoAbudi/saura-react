import axios from "axios";
import { atualizaToken } from "./chamadasApi/usuarioApi";
import jwtDecode from "jwt-decode";

function init() {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("app-token");
      if (config.url.toString().endsWith("atualiza_token")) {
        return config;
      }
      if (token) {
        const dados_login = jwtDecode(token);

        if (new Date(dados_login.exp * 1000) > new Date()) {
          config.headers["Authorization"] = `Bearer ${token}`;
          return config;
        } else {
          return new Promise((resolve, reject) => {
            atualizaToken()
              .then((response) => {
                const { token: token_novo, refreshToken } = response.data;
                localStorage.setItem("app-token", token_novo);
                localStorage.setItem("refresh-token", refreshToken);
                localStorage.setItem("reloadCount", 0);
                config.headers["Authorization"] = `Bearer ${token_novo}`;
                resolve(config);
              })
              .catch(() => {
                let reloadCount = localStorage.getItem("reloadCount") || 0;
                reloadCount = parseInt(reloadCount) + 1;
                localStorage.setItem("reloadCount", reloadCount);
                console.log(`Tentativa ${reloadCount} de renovar o token`);
                if (reloadCount >= 3) {
                  console.log("Removendo token - set_interceptor_axios.js");
                  localStorage.setItem("reloadCount", 0);
                  localStorage.removeItem("app-token");
                  localStorage.removeItem("refresh-token");
                  window.location.reload();
                } else {
                  window.location.reload();
                }
              });
          });
        }
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
}

init();
