import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CampoSelect from "./CampoSelect";
import { withStyles } from "@mui/styles";
import Checkbox from "@mui/material/Checkbox";
import SelectCargo from "./SelectCargo";
import { toast } from "react-toastify";

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

const ListaAddFiliais = (props) => {
  const [idSelecionado, setIdSelecionado] = useState(0);
  //const [checked, setChecked] = useState(false);
  const [mostraMenu, setMostraMenu] = React.useState("false");
  const [selectedCheckboxId, setSelectedCheckboxId] = useState(null);
  const [cargo, setCargo] = useState(null);

  useEffect(() => {
    const filialPrincipal = props.dadosSelecionados.find(
      (filial) => filial.checked
    );
    if (filialPrincipal) {
      setSelectedCheckboxId(filialPrincipal.id);
    }
  }, []);

  const { classes } = props;

  const handleClick = () => {
    if (cargo && idSelecionado) {
      props.handleAdd(
        idSelecionado,
        cargo,
        idSelecionado === selectedCheckboxId
      );
      setMostraMenu(false);
      setIdSelecionado(0);
      setCargo(null);
    } else {
      toast.error("Selecione todos os campos");
    }
  };

  const handleCancelar = () => {
    setMostraMenu(false);
    setIdSelecionado(0);
    setCargo(null);
  };

  const removerSelecao = (id) => {
    props.removerSelecao(id);
    //setChecked(!checked);
  };

  const handleCheckbox = (dado) => {
    setSelectedCheckboxId(dado.id);
    const lista = props.dadosSelecionados.map((item) => ({
      ...item,
      checked: item.id === dado.id ? true : false,
    }));
    props.handleCheckbox(lista, dado.id);
  };

  return (
    <div>
      <div>
        <h4>{props.titulo}</h4>
        {props.dadosSelecionados.map((dado) => (
          <div key={dado.id} style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              disabled={props.estadoBotao}
              onClick={() => removerSelecao(dado.id)}
              size="large"
            >
              <CloseIcon />
            </IconButton>

            <div style={{ flex: 1, marginLeft: 10 }}>
              <div>{props.mostraLinhaSelecionada(dado)}</div>
              <div>{props.mostraCargoSelecionado(dado)}</div>
            </div>

            <label>
              <Checkbox
                value={dado.checked}
                checked={dado.id === selectedCheckboxId}
                label={props.descricaoCheckBox}
                margin="normal"
                variant="outlined"
                type="checkbox"
                onClick={() => handleCheckbox(dado)}
              />
              {props.descricaoCheckBox}
            </label>
          </div>
        ))}

        {mostraMenu === true ? (
          <div>
            <div>
              <CampoSelect
                largura="234px"
                dados={props.dados}
                label={props.descricaoSelect}
                onSelected={(dado) => setIdSelecionado(dado.id)}
                mostraLinha={(dado) => props.mostraLinha(dado)}
              />
              <div style={{ height: "12px" }}></div>

              {idSelecionado ? (
                <SelectCargo
                  name="cargo"
                  onSelected={(cargo) => {
                    setCargo(cargo);
                  }}
                  width={300}
                  idInicial={cargo ? cargo.id : 0}
                  filialSelecionada={idSelecionado}
                />
              ) : null}

              {/* <label>
                                <Checkbox
                                    value={checked}
                                    checked={checked}
                                    label={props.descricaoCheckBox}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(event) => setChecked(event.target.checked)}
                                    type="checkbox"
                                />
                                {props.descricaoCheckBox}
                            </label> */}
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
              width: "187px",
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

export default withStyles(styles)(ListaAddFiliais);
