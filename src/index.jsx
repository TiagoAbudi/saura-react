import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { SidebarProvider } from "./context/SidebarContext";
import "./set_interceptor_axios";
import { atualizaToken } from "./chamadasApi/usuarioApi";
import jwtDecode from "jwt-decode";

setInterval(() => {
  const token = localStorage.getItem("app-token");
  let renovando = localStorage.getItem("renovando")
    ? localStorage.getItem("renovando")
    : false;

  if (!token) return;
  console.log(renovando);

  const dados_login = jwtDecode(token);
  const data = new Date();
  if (new Date(dados_login.exp * 1000 - 120000) < data && !renovando) {
    console.log("renovando");

    localStorage.setItem("renovando", true);
    atualizaToken()
      .then((response) => {
        const { token: token_novo, refreshToken } = response.data;
        console.log(token_novo);
        localStorage.setItem("app-token", token_novo);
        localStorage.setItem("refresh-token", refreshToken);
        localStorage.setItem("renovando", false);
      })
      .catch((error) => {
        console.log("Removendo token - função em index.js");
        localStorage.removeItem("app-token");
        localStorage.removeItem("refresh-token");
        localStorage.setItem("renovando", false);
        console.log(error);
      });
  }
}, 300000);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
