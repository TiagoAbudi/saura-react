import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import makeStyles from "@mui/styles/makeStyles";
import "react-toastify/dist/ReactToastify.css";
import { Box, useTheme } from "@mui/material";
import logo from "../../img/logo.png";
import { tokens } from "../../theme";
import CampoTextoLogin from "../../components/CampoTextoLogin";
import CampoSenhaLogin from "../../components/CampoSenhaLogin";
import { autentica, autenticaComFilial } from "../../chamadasApi/usuarioApi";
import jwt_decode from "jwt-decode";
import "./Login.css";
import { toast } from "react-toastify";
import { history } from "../../history";
import DialogAlertItensFiliais from "../../components/DialogAlertItensFiliais";

const useStyles = makeStyles(() => ({
  divCampos: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

const colunas = [
  {
    field: "id",
    headerName: "Código",
    width: 100,
    align: "right",
    hide: false,
  },
  {
    field: "nome",
    headerName: "Nome Filial",
    width: 250,
    align: "left",
    hide: false,
  },
];

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [countCredentialsTyped, setCountCredentialsTyped] = useState(0);
  const [filiais, setFiliais] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogin = (event) => {
    setLogin(event.target.value);
  };

  const handleSenha = (event) => {
    if (!countCredentialsTyped) {
      setSenha(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtnDisabled(true);
    autentica(login, senha)
      .then((data) => {
        setCountCredentialsTyped((credentialsTyped) => credentialsTyped + 1);
        const payload = jwt_decode(data.token);
        console.log("payload: ", payload);
        setFiliais(payload.filiais);
        setOpenDialog(true);
        setTimeout(() => {
          setBtnDisabled(false);
        }, 3000);
      })
      .catch((error) => {
        localStorage.removeItem("app-token");
        localStorage.removeItem("refresh-token");
        if (error && error.data) {
          console.log(error);
          console.log(error.data);
          toast.error(`${error.data ? error.data.erro : error}`, {
            theme: "colored",
          });
        } else {
          toast.error(`${error}`, {
            theme: "colored",
          });
        }
        setTimeout(() => {
          setBtnDisabled(false);
        }, 3000);
      });
  };

  const fecharDialogs = () => {
    setOpenDialog(false);
    window.location.reload(false);
  };

  const classes = useStyles();

  const selecionaFilial = (params) => {
    const id_filial = params.row.id;
    console.log(id_filial);
    autenticaComFilial(id_filial, login, senha)
      .then(async (data) => {
        const { token, refreshToken } = data;
        localStorage.setItem("app-token", token);
        localStorage.setItem("refresh-token", refreshToken);
        history.push("/");
      })
      .catch((error) => {
        setOpenDialog(false);
        localStorage.removeItem("app-token");
        localStorage.removeItem("refresh-token");
        if (error && error.data) {
          toast.error(
            `${error.data.message ? error.data.message : error}`,
            {
              theme: "colored",
            }
          );
        } else {
          toast.error(`${error}`, {
            theme: "colored",
          });
        }
      });
  }

  return (
    <div className={classes.divCampos}>
      <Container component="main" maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <div>
            <Box
              style={{
                padding: "12px",
              }}
              backgroundColor={colors.primary[400]}
              sx={{
                borderRadius: 5,
              }}
            >
              <center>
                <img
                  src={logo}
                  alt=""
                  style={{ marginTop: theme.spacing(8), userSelect: "none" }}
                />
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  sx={{ userSelect: "none" }}
                >
                  SauraERP
                </Typography>
              </center>

              <CampoTextoLogin
                style={{
                  width: "100%",
                  marginTop: theme.spacing(8),
                  userSelect: "none",
                }}
                name="login"
                id="login"
                label="Login"
                defaultValue={login}
                variant="outlined"
                required={true}
                onChange={handleLogin}
                dataCy={"user"}
                autoComplete="login"
                autoFocus={true}
              />

              <CampoSenhaLogin
                style={{ width: "100%", marginTop: "10px", userSelect: "none" }}
                name="password"
                id="password"
                label="Senha"
                defaultValue={senha}
                variant="outlined"
                required={true}
                onChange={handleSenha}
                dataCy={"password"}
                autoComplete="current-password"
              />

              <Button
                disabled={btnDisabled}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: 5,
                  mt: 5,
                }}
                type="submit"
                fullWidth
                variant="contained"
                data-cy={"button-login"}
              >
                Entrar
              </Button>
            </Box>
          </div>
        </form>

        <DialogAlertItensFiliais
          titulo="Filiais"
          mostrar={openDialog}
          mensagem="Escolha a filial que deseja fazer o login"
          textoNao="Fechar"
          callbackNao={() => fecharDialogs()}
          colunas={colunas}
          altura="350px"
          largura="500px"
          linhas={filiais}
          onRowClick={(params) => selecionaFilial(params)}
        />
      </Container>
    </div>
  );
};

export default Login;
