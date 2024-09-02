import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { withStyles } from "@mui/styles";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import FiltroData from "./FiltroData";
import { Divider, FormControlLabel } from "@mui/material";
import CampoTexto from "./CampoTexto";

const styles = (theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  lista: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  campos: {},
  inteiro: {
    minWidth: "50%",
    width: "50%",
  },
  select: {
    margin: 10,
    width: "50%",
  },
  submit: {
    margin: 3,
    backgroundColor: "green",
  },
  submitCancelar: {
    margin: 3,
    backgroundColor: "red",
  },
});

const ListaAddMetodosRecebimentoDocumental = (props) => {
  const [mostraMenu, setMostraMenu] = useState("false");
  const [responsavel, setResponsavel] = useState("");
  const [outros, setOutros] = useState("");
  const [state, setState] = useState({
    email: false,
    site: false,
    aplicativo: false,
    correspondencia: false,
  });
  const { email, site, aplicativo, correspondencia } = state;

  const handleClick = () => {
    if (responsavel && outros) {
      props.handleAdd({
        responsavel,
        email,
        site,
        aplicativo,
        correspondencia,
        outros,
      });
      setMostraMenu(false);
    } else {
      toast.error("Preencha todos os campos");
    }
  };

  const handleCancelar = () => {
    setMostraMenu(false);
  };

  const removerSelecao = (id) => {
    props.removerSelecao(id);
    //setChecked(!checked);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <div>
        <h4>{props.titulo}</h4>
        {props.dadosSelecionados.map((dado, index) => (
          <div key={dado.id} style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              //disabled={props.estadoBotao}
              onClick={() => removerSelecao(dado.id)}
              size="large"
            >
              <CloseIcon />
            </IconButton>

            <div
              style={{
                flex: 1,
                marginLeft: 10,
                flexDirection: "column",
                marginBottom: "12px",
              }}
            >
              <span>Método {index + 1}</span>
              <div style={{ marginTop: "12px" }}>
                <div>
                  <div>
                    <CampoTexto
                      style={{ width: "24%", marginRight: "5px" }}
                      name="responsavel"
                      id="responsavel"
                      label="Responsável"
                      required={true}
                      value={dado.responsavel}
                      disabled={true}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox checked={dado.email} name="email" disabled />
                      }
                      label="Email"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox checked={dado.site} name="site" disabled />
                      }
                      label="Site"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={dado.aplicativo}
                          name="aplicativo"
                          disabled
                        />
                      }
                      label="Aplicativo"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={dado.correspondencia}
                          name="correspondencia"
                          disabled
                        />
                      }
                      label="Correspondência"
                    />

                    <CampoTexto
                      style={{ width: "24%", marginRight: "5px" }}
                      name="outros"
                      id="outros"
                      label="Outros"
                      required={true}
                      value={dado.outros}
                      focusnext="select-licenca"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {mostraMenu === true ? (
          <div>
            <div style={{ width: "100%", height: "20px" }}>
              <Divider orientation="horizontal" flexItem />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <span>Cadastro de étodo de recebimento documental</span>
            </div>
            <div>
              <CampoTexto
                style={{ width: "24%", marginRight: "5px" }}
                name="responsavel"
                id="responsavel"
                label="Responsável"
                required={true}
                value={responsavel}
                focusnext="select-licenca"
                onChange={(e) => setResponsavel(e.target.value)}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={email}
                    onChange={handleChange}
                    name="email"
                  />
                }
                label="Email"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={site}
                    onChange={handleChange}
                    name="site"
                  />
                }
                label="Site"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={aplicativo}
                    onChange={handleChange}
                    name="aplicativo"
                  />
                }
                label="Aplicativo"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={correspondencia}
                    onChange={handleChange}
                    name="correspondencia"
                  />
                }
                label="Correspondência"
              />

              <CampoTexto
                style={{ width: "24%", marginRight: "5px" }}
                name="outros"
                id="outros"
                label="Outros"
                required={true}
                value={outros}
                focusnext="select-licenca"
                onChange={(e) => setOutros(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <Button
                onClick={handleCancelar}
                style={{
                  color: "#f2f2f2",
                  background: "red",
                  fontFamily: `"Roboto", sans-serif`,
                  fontWeight: "bold",
                  borderRadius: "7px",
                  marginRight: "10px",
                }}
              >
                Cancelar
              </Button>

              <Button
                style={{
                  width: "187px",
                  fontWeight: "bold",
                  fontFamily: `"Roboto", sans-serif`,
                  backgroundColor: "#03A62C",
                  borderRadius: "7px",
                  color: "#f2f2f2",
                }}
                type="submit"
                variant="contained"
                id="btnAdd"
                onClick={handleClick}
              >
                {props.textoAdd}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            style={{
              width: "360px",
              fontWeight: "bold",
              fontFamily: `"Roboto", sans-serif`,
              backgroundColor: "#03A62C",
              color: "#f2f2f2",
            }}
            type="submit"
            variant="contained"
            onClick={() => setMostraMenu(true)}
            id="cadastra"
            disabled={props.estadoBotao}
          >
            {props.tituloBotao}
          </Button>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(ListaAddMetodosRecebimentoDocumental);
