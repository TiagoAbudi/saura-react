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

const ListaAddReiteracoes = (props) => {
  const [mostraMenu, setMostraMenu] = useState("false");
  const [programada, setProgramada] = useState(new Date());
  const [realizada, setRealizada] = useState(new Date());
  const [state, setState] = useState({
    automatica: false,
  });
  const { automatica } = state;

  const handleClick = () => {
    props.handleAdd({
      automatica,
      programada,
      realizada,
    });
    setMostraMenu(false);
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

            <div style={{ flex: 1, marginLeft: 10, flexDirection: "column" }}>
              <span>Reiteração {index + 1}</span>
              <div style={{ marginTop: "12px" }}>
                <div>
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={dado.automatica}
                          name="automatica"
                          disabled
                        />
                      }
                      label="Automática"
                    />

                    <FiltroData
                      dataInicial={dado.programada}
                      dialogData={true}
                      titulo="Data Hora Acao"
                      largura="25%"
                      hora={true}
                      disabled={true}
                    />

                    <FiltroData
                      dataInicial={dado.realizada}
                      dialogData={true}
                      titulo="Data Hora Inicio Desclocamento"
                      largura="25%"
                      hora={true}
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
              <span>Cadastro de reiteração</span>
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={automatica}
                    onChange={handleChange}
                    name="automatica"
                  />
                }
                label="Automática"
              />

              <FiltroData
                dataInicial={programada}
                onSelectDataInicial={(date) => setProgramada(date)}
                dialogData={true}
                titulo="Data Hora Acao"
                largura="25%"
                hora={true}
              />

              <FiltroData
                dataInicial={realizada}
                onSelectDataInicial={(date) => setRealizada(date)}
                dialogData={true}
                titulo="Data Hora Inicio Desclocamento"
                largura="25%"
                hora={true}
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
              width: "200px",
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

export default withStyles(styles)(ListaAddReiteracoes);
