import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { withStyles } from "@mui/styles";
import CampoTexto from "./CampoTexto";
import { toast } from "react-toastify";
import SelectEmpresa from "./SelectEmpresa";
import UFSelect from "./UFSelect";
import { buscaCep } from "../util/buscaCep";
import getEstadoByUF from "../util/obtemEstado";
import { buscaFilialById } from "../chamadasApi/filialApi";

const styles = () => ({
  div: {
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
});

const DialogCadastroFiliais = (props) => {
  const { classes } = props;
  const [codigo, setCodigo] = useState("0");
  const [nome, setNome] = useState("");
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [ativo, setAtivo] = useState(true);
  const [idEmpresa, setIdEmpresa] = useState(0);
  const [idEndereco, setIdEndereco] = useState(0);
  const [empresa, setEmpresa] = useState(null);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState({
    estado: "",
    uf: "",
  });
  const campoTextoRef = useRef(null);

  const handleClose = () => {
    props.callbackNao();
    setCodigo("");
    setNome("");
    setIdEmpresa(0);
    setIdEndereco(0);
    setAtivo(true);
    setEmpresa(null);
    setUf({
      estado: "",
      uf: "",
    });
    setCep("");
    setEndereco("");
    setNumero("");
    setComplemento("");
    setBairro("");
    setCidade("");
  };

  const handleSim = () => {
    let values = {
      codigo: codigo,
      nome: nome,
      id_empresa: idEmpresa,
      //id_endereco: idEndereco,
      ativo: ativo,
      Empresa: empresa,
      Endereco: {
        bairro,
        cep,
        cidade,
        complemento,
        logradouro: endereco,
        numero,
        uf: uf.uf,
        estado: uf.estado,
      },
    };

    console.log(values);

    if (
      !codigo ||
      !nome ||
      !bairro ||
      !cep ||
      !cidade ||
      !endereco ||
      !numero ||
      !uf.uf ||
      !empresa
    ) {
      toast.error("Preencha todos os campos para prosseguir", {
        theme: "colored",
      });
      if (campoTextoRef.current) {
        campoTextoRef.current.focus();
      }
      return;
    }

    props.callbackSim(values);
    //setid("");
    setCodigo("");
    setNome("");
    setIdEmpresa(0);
    setIdEndereco(0);
    setAtivo(true);
    setEmpresa(null);
    setUf({
      estado: "",
      uf: "",
    });
    setCep("");
    setEndereco("");
    setNumero("");
    setComplemento("");
    setBairro("");
    setCidade("");
  };

  const getFilial = (id) => {
    buscaFilialById(id)
      .then((resp) => {
        console.log("FILIAL", resp);
        setCodigo(resp.codigo);
        setNome(resp.nome);
        setIdEndereco(resp.id_endereco);
        setIdEmpresa(resp.id_empresa);
        setUf({
          estado: resp.Endereco.estado,
          uf: resp.Endereco.uf,
        });
        setCep(resp.Endereco.cep);
        setEndereco(resp.Endereco.logradouro);
        setNumero(resp.Endereco.numero);
        setComplemento(resp.Endereco.complemento);
        setBairro(resp.Endereco.bairro);
        setCidade(resp.Endereco.cidade);
        setEmpresa(resp.Empresa);
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    if (props.filial) {
      getFilial(props.filial);
    } else {
      setCodigo("");
    }
  }, [props.filial]);

  const getCep = (cep) => {
    setCep(cep);
    setBuscandoCep(true);
    buscaCep(cep)
      .then((resp) => {
        //console.log("FILIAIS", resp);
        setEndereco(resp.logradouro);
        setBairro(resp.bairro);
        setCidade(resp.localidade);
        setUf({
          estado: getEstadoByUF(resp.uf),
          uf: resp.uf,
        });
        setBuscandoCep(false);
      })
      .catch((error) => {
        setBuscandoCep(false);
        toast.warn(`Erro ao buscar informações do CEP`, { theme: "colored" });
      });
  };

  return (
    <Dialog
      open={props.mostrar}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"md"}
    >
      <DialogTitle id="alert-dialog-title">{props.titulo}</DialogTitle>
      <DialogContent>
        <div className={classes.div}>
          <CampoTexto
            style={{ width: "29%" }}
            name="id"
            id="id"
            label="Código"
            required={true}
            value={codigo}
            tipo="number"
            focusnext="nome"
            onChange={(e) => setCodigo(e.target.value)}
            autoFocus
            ref={campoTextoRef}
          />
          <CampoTexto
            style={{ width: "69%" }}
            name="nome"
            id="nome"
            label="Nome"
            required={true}
            value={nome}
            focusnext="select-empresa"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={classes.div}>
          <SelectEmpresa
            name="empresa"
            onSelected={(empresa) => {
              console.log(empresa);
              setIdEmpresa(empresa.id);
              setEmpresa(empresa);
            }}
            width={"100%"}
            focusnext="cep"
            idInicial={idEmpresa}
          />
        </div>

        <div className={classes.div}>
          <CampoTexto
            style={{ width: "29%" }}
            id="cep"
            name="cep"
            label="Cep"
            value={cep}
            variant="outlined"
            tipo="number"
            required={true}
            focusnext="logradouro"
            onChange={(e) => {
              if (e.target.value.length == 8) {
                getCep(e.target.value);
              } else {
                setCep(e.target.value);
              }
            }}
          />

          <CampoTexto
            style={{ width: "69%" }}
            id="logradouro"
            name="logradouro"
            label="Logradouro"
            value={endereco}
            variant="outlined"
            required={true}
            disabled={buscandoCep}
            focusnext="numero"
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        <div className={classes.div}>
          <CampoTexto
            style={{ width: "29%" }}
            id="numero"
            name="numero"
            required={true}
            label="Nº"
            value={numero}
            variant="outlined"
            type="number"
            focusnext="complemento"
            onChange={(e) => setNumero(e.target.value)}
          />

          <CampoTexto
            style={{ width: "69%" }}
            id="complemento"
            name="complemento"
            label="Complemento"
            value={complemento}
            variant="outlined"
            focusnext="bairro"
            onChange={(e) => setComplemento(e.target.value)}
          />
        </div>

        <div className={classes.div}>
          <CampoTexto
            style={{ width: "49%" }}
            id="bairro"
            name="bairro"
            label="Bairro"
            required={true}
            value={bairro}
            variant="outlined"
            disabled={buscandoCep}
            focusnext="municipio"
            onChange={(e) => setBairro(e.target.value)}
          />

          <CampoTexto
            style={{ width: "49%" }}
            id="municipio"
            name="municipio"
            label="Cidade"
            required={true}
            value={cidade}
            variant="outlined"
            disabled={buscandoCep}
            focusnext="select-uf"
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>

        <div className={classes.div}>
          <UFSelect
            largura="39%"
            label="UF"
            value={uf.estado}
            onSelected={(e) => {
              setUf(e);
            }}
            disabled={buscandoCep}
          />
        </div>
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

export default withStyles(styles)(DialogCadastroFiliais);
