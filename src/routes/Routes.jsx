import React from "react";
import { Router, Switch } from "react-router";
import { history } from "../history";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";
import AllowLogin from "./AllowLogin";

// IMPORT DO LOGIN
import Login from "../pages/login/Login";

// IMPORT DA HOME
import Home from "../pages/home/Home";

// IMPORT CADASTROS
import CadastroCargos from "../pages/cadastro-cargos/CadastroCargos";
import CadastroEmpresas from "../pages/cadastro-empresas/CadastroEmpresas";
import CadastroFiliais from "../pages/cadastro-filiais/CadastroFiliais";
import CadastroUsuarios from "../pages/cadastro-usuarios/CadastroUsuarios";
import CadastroProcessos from "../pages/cadastro-processos/CadastroProcessos";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        {/* ROTA LOGIN */}
        <AllowLogin component={Login} exact path="/login" />

        {/* ROTA HOME */}
        <AllowLogin component={Home} exact path="/" />

        {/* ROTAS DE CADASTRO */}
        <PrivateRoute component={CadastroCargos} exact path="/cargos" />
        <PrivateRoute component={CadastroEmpresas} exact path="/empresas" />
        <PrivateRoute component={CadastroFiliais} exact path="/filiais" />
        <PrivateRoute component={CadastroUsuarios} exact path="/usuarios" />
        <PrivateRoute component={CadastroProcessos} exact path="/processos" />

        <PrivateRoute component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
