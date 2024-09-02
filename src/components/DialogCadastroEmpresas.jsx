import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import isValidCNPJ from "../util/validaCNPJ";
import { withStyles } from "@mui/styles";
import CampoTexto from "../components/CampoTexto";
import { toast } from "react-toastify";
import UFSelect from "./UFSelect";
import getEstadoByUF from "../util/obtemEstado";
import { buscaCep } from "../util/buscaCep";
import { buscaEmpresaById } from "../chamadasApi/empresaApi";

const styles = () => ({
  div: {
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
});

const DialogCadastroEmpresas = (props) => {
  const { classes } = props;
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [codigo, setCodigo] = useState(0);
  const [cnpj, setCNPJ] = useState(0);
  const [razao_social, setRazaoSocial] = useState("");
  const [nome_fantasia, setNomeFantasia] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState(0);
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState(0);
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState({
    estado: "",
    uf: "",
  });
  const [ativo, setAtivo] = useState(true);
  const campoTextoRef = useRef(null);
  //const [codigoEmpresa, setEmpresaCodigo] = useState(props.empresa);

  const handleClose = () => {
    props.callbackNao();
    setCNPJ(0);
    setRazaoSocial("");
    setNomeFantasia("");
    setLogradouro("");
    setNumero(0);
    setComplemento("");
    setBairro("");
    setCep(0);
    setCidade("");
    setUf({
      estado: "",
      uf: "",
    });
    setAtivo(true);
    setCodigo(0);
  };

  const handleSim = () => {
    if (!isValidCNPJ(cnpj)) {
      toast.error("O CNPJ digitado é inválido", {
        theme: "colored",
      });
      if (campoTextoRef.current) {
        campoTextoRef.current.focus();
      }
      return;
    }

    if (
      !razao_social ||
      !nome_fantasia ||
      !cidade ||
      !logradouro ||
      !numero ||
      !bairro ||
      !cep ||
      !uf.estado ||
      !uf.uf
    ) {
      toast.error("Preencha todos os campos para prosseguir", {
        theme: "colored",
      });
      if (campoTextoRef.current) {
        campoTextoRef.current.focus();
      }
      return;
    }

    let values = {
      cnpj: cnpj,
      razao_social: razao_social,
      nome_fantasia: nome_fantasia,
      Endereco: {
        cidade: cidade,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cep: cep,
        estado: uf.estado,
        uf: uf.uf,
      },
      ativo: ativo,
    };
    props.callbackSim(values);
    setCodigo(0);
    setCNPJ(0);
    setRazaoSocial("");
    setNomeFantasia("");
    setLogradouro("");
    setNumero(0);
    setComplemento("");
    setBairro("");
    setCep(0);
    setCidade("");
    setUf({
      estado: "",
      uf: "",
    });
    setAtivo(true);
  };

  const getCep = (cep) => {
    setCep(cep);
    setBuscandoCep(true);
    buscaCep(cep)
      .then((resp) => {
        //console.log("FILIAIS", resp);
        setLogradouro(resp.logradouro);
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

  const getEmpresa = (id) => {
    buscaEmpresaById(id)
      .then((resp) => {
        //console.log("FILIAIS", resp);
        setCodigo(resp.id);
        setCNPJ(resp.cnpj);
        setRazaoSocial(resp.razao_social);
        setNomeFantasia(resp.nome_fantasia);
        setLogradouro(resp.Endereco.logradouro);
        setNumero(resp.Endereco.numero);
        setComplemento(resp.Endereco.complemento);
        setBairro(resp.Endereco.bairro);
        setCep(resp.Endereco.cep);
        setCidade(resp.Endereco.cidade);
        setUf({
          estado: resp.Endereco.estado,
          uf: resp.Endereco.uf,
        });
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    if (props.empresa > 0) {
      getEmpresa(props.empresa);
    } else {
      setCodigo(null);
    }
  }, [props.empresa]);

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
            name="cnpj"
            id="cnpj"
            label="CNPJ"
            tipo="number"
            required={true}
            value={cnpj}
            focusnext="nome_fantasia"
            onChange={(e) => setCNPJ(e.target.value)}
            autoFocus
            ref={campoTextoRef}
          />
          <CampoTexto
            style={{ width: "69%" }}
            name="nome_fantasia"
            id="nome_fantasia"
            label="Nome Fantasia"
            required={true}
            value={nome_fantasia}
            focusnext="razao_social"
            onChange={(e) => setNomeFantasia(e.target.value)}
          />
        </div>
        <div className={classes.div}>
          <CampoTexto
            style={{ width: "100%" }}
            name="razao_social"
            id="razao_social"
            label="Razão Social"
            required={true}
            value={razao_social}
            focusnext="cep"
            onChange={(e) => setRazaoSocial(e.target.value)}
          />
        </div>
        <div className={classes.div}>
          <CampoTexto
            style={{ width: "29%" }}
            name="cep"
            id="cep"
            label="CEP"
            required={true}
            tipo={"number"}
            value={cep}
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
            name="logradouro"
            id="logradouro"
            label="Logradouro"
            required={true}
            value={logradouro}
            disabled={buscandoCep}
            focusnext="numero"
            onChange={(e) => setLogradouro(e.target.value)}
          />
        </div>
        <div className={classes.div}>
          <CampoTexto
            style={{ width: "29%" }}
            name="numero"
            id="numero"
            label="Número"
            required={true}
            value={numero}
            focusnext="complemento"
            onChange={(e) => setNumero(e.target.value)}
          />
          <CampoTexto
            style={{ width: "69%" }}
            name="complemento"
            id="complemento"
            label="Complemento"
            value={complemento}
            focusnext="bairro"
            onChange={(e) => setComplemento(e.target.value)}
          />
        </div>
        <div className={classes.div}>
          <CampoTexto
            style={{ width: "100%" }}
            name="bairro"
            id="bairro"
            label="Bairro"
            required={true}
            value={bairro}
            disabled={buscandoCep}
            focusnext="cidade"
            onChange={(e) => setBairro(e.target.value)}
          />
        </div>
        <div className={classes.div}>
          <CampoTexto
            style={{ width: "69%" }}
            name="cidade"
            id="cidade"
            label="Cidade"
            required={true}
            value={cidade}
            disabled={buscandoCep}
            focusnext="select-uf"
            onChange={(e) => setCidade(e.target.value)}
          />
          <UFSelect
            largura="29%"
            label="UF"
            value={uf.estado}
            onSelected={(e) => {
              setUf(e);
            }}
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

export default withStyles(styles)(DialogCadastroEmpresas);
