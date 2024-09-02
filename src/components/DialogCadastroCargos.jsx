import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { withStyles } from "@mui/styles";
import CampoTexto from "./CampoTexto";
import { toast } from "react-toastify";
import CampoSelect from "./CampoSelect";
import jwtDecode from "jwt-decode";
import { buscarTodasFiliais } from "../chamadasApi/filialApi";
import { buscaCargoById } from "../chamadasApi/cargoApi";

const styles = () => ({
  div: {
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
});

const DialogCadastroCargos = (props) => {
  const [codigo, setCodigo] = useState("");
  const [cargo, setCargo] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [filiais, setFiliais] = useState([]);
  const [idFilial, setIdFilial] = useState(0);
  const [idDashboard, setIdDashboard] = useState(0);
  const [edicao, setEdicao] = useState(false);
  const campoTextoRef = useRef(null);

  const handleClose = () => {
    props.callbackNao();
    setCodigo("");
    setCargo("");
    setIdFilial(0);
    //setFiliais([])
    setAtivo(true);
  };

  const handleSim = () => {
    if (!codigo || !cargo || !idFilial ) {
      toast.error("Preencha todos os campos para prosseguir", {
        theme: "colored",
      });
      if (campoTextoRef.current) {
        campoTextoRef.current.focus();
      }
      return;
    }

    let values = {
      codigo: codigo,
      cargo: cargo,
      id_filial: idFilial,
      ativo: ativo,
      // dashboard_especifico: idDashboard === 1 ? false : true,
    };

    props.callbackSim(values);
    setCodigo("");
    setCargo("");
    setIdFilial(0);
    setIdDashboard(0);
    //setFiliais([])
    setAtivo(true);
  };

  const getCargo = (id) => {
    buscaCargoById(id)
      .then((resp) => {
        setCodigo(resp.codigo);
        setCargo(resp.cargo);
        setIdFilial(resp.id_filial);
        setEdicao(true);
        if (resp.dashboard_especifico) {
          setIdDashboard(2);
        } else {
          setIdDashboard(1);
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (props.cargo && props.cargo > 0) {
      getCargo(props.cargo);
    }
  }, [props.cargo]);

  useEffect(() => {
    getFiliais();
  }, []);

  const getFiliais = () => {
    const token = localStorage.getItem("app-token");
    const payload = token ? jwtDecode(token) : "";
    const idEmpresa = payload.id_empresa ? payload.id_empresa : "";
    if (idEmpresa === 3) {
      buscarTodasFiliais()
        .then((dados) => {
          setFiliais(dados.filiais);
        })
        .catch((error) => console.log(error));
    } else {
      buscarTodasFiliais({
        field: "id_empresa",
        operator: "=",
        value: idEmpresa,
      })
        .then((dados) => {
          setFiliais(dados.filiais);
        })
        .catch((error) => console.log(error));
    }
  };

  const { classes } = props;

  return (
    <Dialog
      open={props.mostrar}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"md"}
      disableRestoreFocus
    >
      <DialogTitle id="alert-dialog-title">{props.titulo}</DialogTitle>
      <DialogContent>
        <div className={classes.div}>
          <CampoTexto
            style={{ width: "29%" }}
            name="codigo"
            id="codigo"
            label="Código"
            value={codigo}
            variant="outlined"
            tipo="number"
            focusnext="cargo"
            required={true}
            onChange={(e) => setCodigo(e.target.value)}
            autoFocus
            ref={campoTextoRef}
          />

          <CampoTexto
            style={{ width: "69%" }}
            name="cargo"
            id="cargo"
            label="Cargo"
            value={cargo}
            variant="outlined"
            required={true}
            focusnext="select-dado"
            onChange={(e) => setCargo(e.target.value)}
          />
        </div>

        <div className={classes.div}>
          <CampoSelect
            largura="100%"
            dados={filiais}
            label={"Filial"}
            onSelected={(dado) => {
              setIdFilial(dado.id);
            }}
            mostraLinha={(dado) => `${dado.id} - ${dado.nome}`}
            edicao={edicao}
            campoEdicao={"filial"}
            value={idFilial}
          />
        </div>

        {/* <div className={classes.div}>
          <CampoSelect
            largura="100%"
            dados={[
              {
                id: 1,
                nome: "Padrão",
                padrao: true,
              },
              {
                id: 2,
                nome: "Específico",
                padrao: false,
              },
            ]}
            label={"Dashboard"}
            onSelected={(dado) => {
              setIdDashboard(dado.id);
            }}
            mostraLinha={(dado) => `${dado.id} - ${dado.nome}`}
            edicao={edicao}
            campoEdicao={"filial"}
            value={idDashboard}
          />
        </div> */}
        
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          style={{
            color: "#f2f2f2",
            background: "red",
            fontFamily: `"Roboto", sans-serif`,
            fontWeight: "bold",
            borderRadius: "7px",
          }}
        >
          {props.textoNao}
        </Button>
        {props.callbackSim ? (
          <Button
            onClick={handleSim}
            autoFocus
            type="submit"
            style={{
              color: "#f2f2f2",
              background: "green",
              fontFamily: `"Roboto", sans-serif`,
              fontWeight: "bold",
              borderRadius: "7px",
            }}
          >
            {props.textoSim}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(DialogCadastroCargos);
