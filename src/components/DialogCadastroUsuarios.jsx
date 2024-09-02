import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { withStyles } from "@mui/styles";
import CampoTexto from "./CampoTexto";
import { toast } from "react-toastify";
import SelectLicenca from "./SelectLicenca";
import CampoSenha from "./CampoSenha";
import ListaAddFiliais from "./ListaAddFiliais";
import jwt_decode from "jwt-decode";
import { buscarTodasFiliais } from "../chamadasApi/filialApi";
import { buscaCargoById } from "../chamadasApi/cargoApi";
import { buscaUsuarioById } from "../chamadasApi/usuarioApi";
import SelectCargo from "./SelectCargo";

const styles = () => ({
  div: {
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
});

const DialogCadastroUsuarios = (props) => {
  const { classes } = props;
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [codigoUsuario, setUsuarioCodigo] = useState(props.usuario);
  const [idEmpresa, setIdEmpresa] = useState(0);
  //const [idFilial, setIdFilial] = useState(0);
  const [idLicenca, setIdLicenca] = useState(0);
  const [licencaSelecionada, setLicencaSelecionada] = useState(null);
  const [idCargo, setIdCargo] = useState(0);
  const [isCadastro, setIsCadastro] = useState(true);
  const [filiaisSelecionadas, setfiliaisSelecionadas] = useState([]);
  const [filiais, setFiliais] = useState([]);
  const [primeiraExecucao, setPrimeiraExecucao] = useState(false);
  const [cargoUSuarioLogado, setCargoUSuarioLogado] = useState(false);
  const [filialPadrao, setFilialPadrao] = useState(0);
  const token = localStorage.getItem("app-token");
  const payload = jwt_decode(token);
  const campoTextoRef = useRef(null);
  const campoSenhaRef = useRef(null);

  const handleClose = () => {
    props.callbackNao();
    setCodigo("");
    setNome("");
    setLogin("");
    setSenha("");
    setIdEmpresa(0);
    // setIdFilial(0);
    setIdLicenca(0);
    setIdCargo(0);
    setAtivo(true);
    setfiliaisSelecionadas([]);
    setCargoUSuarioLogado([]);
    setFilialPadrao(0);
    setFiliais([]);
    setLicencaSelecionada(null);
    setPrimeiraExecucao(false);
  };

  const handleSim = () => {
    // let idEmpresaAux = idEmpresa;

    if (!filialPadrao) {
      {
        toast.error("Defina uma filial como principal", {
          theme: "colored",
        });
        return;
      }
    }

    if (isCadastro) {
      if (!senha) {
        toast.error("Preencha a senha para prosseguir", {
          theme: "colored",
        });
        if (campoSenhaRef.current) {
          campoSenhaRef.current.focus();
        }
        return;
      }
    }

    // if (licencaSelecionada) {
    //   idEmpresaAux = licencaSelecionada.id_empresa;
    // }

    if (
      !codigo ||
      !nome ||
      !login ||
      // !idLicenca ||
      // !idCargo ||
      !filiaisSelecionadas
      // (!licencaSelecionada && !idEmpresa)
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
      codigo: codigo,
      nome: nome,
      login: login,
      // id_empresa: idEmpresaAux,
      // id_licenca: idLicenca,
      id_cargo: idCargo,
      ativo: ativo,
      id_filial: filialPadrao,
      filial_padrao: filialPadrao,
      filiais: filiaisSelecionadas,
    };

    if (isCadastro) {
      values.senha = senha;
    }

    if (!isCadastro) {
      values.id = props.usuario;
    }

    props.callbackSim(values);
    setCodigo("");
    setNome("");
    setLogin("");
    setSenha("");
    // setIdEmpresa(0);
    // setIdLicenca(0);
    setIdCargo(0);
    setAtivo(true);
    setFilialPadrao(0);
    setFiliais([]);
    setLicencaSelecionada(null);
    setPrimeiraExecucao(false);
  };

  const removerFilial = (idSelecionado) => {
    const filialSelecionadaNova = [...filiaisSelecionadas];

    const filialEncontrada = filialSelecionadaNova.find(
      (filial) => filial.id == idSelecionado
    );
    if (filialEncontrada && filialEncontrada.checked) {
      setFilialPadrao(0);
    }
    filialSelecionadaNova.splice(
      filialSelecionadaNova.indexOf(filialEncontrada),
      1
    );
    setfiliaisSelecionadas(filialSelecionadaNova);
  };

  const addFilial = (idSelecionado, cargoSelecionado, checked) => {
    const filiaisSelecionadasNovas = [...filiaisSelecionadas];
    const selectedFilial = filiais.find(
      (filial) => filial.id === idSelecionado
    );

    if (selectedFilial) {
      selectedFilial.checked = checked;
      selectedFilial.cargo_id = cargoSelecionado.id;
      selectedFilial.cargo = cargoSelecionado;
    }

    if (checked) {
      filiaisSelecionadasNovas.forEach((filialSelecionada, index) => {
        if (
          filialSelecionada.id !== idSelecionado &&
          filialSelecionada.checked
        ) {
          filiaisSelecionadasNovas[index].checked = false;
        }
      });
      setFilialPadrao(idSelecionado);
    }

    const filialEncontrada = filiaisSelecionadasNovas.find(
      (filial) => filial.id === idSelecionado
    );

    if (filialEncontrada)
      filiaisSelecionadasNovas.splice(
        filiaisSelecionadasNovas.indexOf(filialEncontrada),
        1
      );

    filiaisSelecionadasNovas.push(selectedFilial);

    setfiliaisSelecionadas(filiaisSelecionadasNovas);
  };

  const setarFilialPadrao = (dados) => {
    if (filialPadrao !== 0) return;

    const id_filial = filialPadrao === 0 ? payload.id_filial : filialPadrao;

    if (filialPadrao === 0) setFilialPadrao(id_filial);

    dados.map((dado) => {
      if (dado.id == id_filial) {
        setfiliaisSelecionadas([{ ...dado, checked: true }]);
      }
    });
  };

  const getFiliais = () => {
    buscarTodasFiliais()
      .then((dados) => {
        console.log(dados);
        setFiliais(dados.filiais);
        // if (licencaSelecionada) {
        //   setFiliais(
        //     dados.empresas.filter(
        //       (filial) => filial.id_empresa === licencaSelecionada.id_empresa
        //     )
        //   );
        // } else if (idEmpresa) {
        //   setFiliais(
        //     dados.empresas.filter((filial) => filial.id_empresa === idEmpresa)
        //   );
        // }
      })
      .catch((error) => console.log(error));
  };

  const setEstadoBotao = () => {
    buscaCargoById(payload.id_cargo).then((data) => {
      console.log("cargo: ", data.cargo === "admin");
      setCargoUSuarioLogado("admin");
    });
  };

  useEffect(() => {
    setEstadoBotao();
    getFiliais();
    if (props.usuario > 0) {
      setIsCadastro(false);
      buscaUsuarioById(props.usuario)
        .then((dados) => {
          setPrimeiraExecucao(true);
          setFilialPadrao(dados.id_filial);
          setCodigo(dados.codigo);
          setNome(dados.nome);
          setLogin(dados.login);
          setIdLicenca(dados.id_licenca);
          setIdCargo(dados.id_cargo);
          setIdEmpresa(dados.id_empresa);
          //setIdFilial(dados.id_filial);

          let filiaisSelecao = dados.filiais.map((filial) => {
            return { ...filial, checked: filial.id === dados.id_filial };
          });
          setfiliaisSelecionadas(filiaisSelecao);
        })
        .catch((error) => console.log(error));
    } else {
      setIsCadastro(true);
      setUsuarioCodigo(0);
    }
  }, [props.usuario]);

  // useEffect(() => {
  //   if (idLicenca !== 0 && !primeiraExecucao) {
  //     setfiliaisSelecionadas([]);
  //     setFilialPadrao(0);
  //     // getFiliais();
  //   }
  // }, [idLicenca]);

  // useEffect(() => {
  //   if (filiaisSelecionadas.length > 0 && primeiraExecucao) {
  //     setPrimeiraExecucao(false);
  //     getFiliais();
  //   }
  // }, [filiaisSelecionadas]);

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
            name="codigo"
            id="codigo"
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
            focusnext="login"
            required={true}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        {isCadastro ? (
          <div className={classes.div}>
            <CampoTexto
              style={{ width: "49%" }}
              name="login"
              id="login"
              label="Login"
              focusnext="outlined-adornment-password"
              required={true}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <CampoSenha
              style={{ width: "49%" }}
              label="Senha"
              required
              defaultValue={senha}
              focusnext="select-licenca"
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="new-password"
              ref={campoSenhaRef}
            />
          </div>
        ) : (
          <div className={classes.div}>
            <CampoTexto
              style={{ width: "100%" }}
              name="login"
              id="login"
              label="Login"
              required={true}
              value={login}
              focusnext="select-licenca"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
        )}
        {/* <div className={classes.div}>
          <SelectEmpresa
            name="empresa"
            onSelected={(empresa) => {
              console.log(empresa);
              setIdEmpresa(empresa.id);
            }}
            width={300}
            idInicial={idEmpresa}
          />
        </div> */}
        {/* <div className={classes.div}>
          <SelectLicenca
            name="licenca"
            onSelected={(licenca) => {
              setIdLicenca(licenca.id);
              setLicencaSelecionada(licenca);
            }}
            idInicial={idLicenca}
          />
        </div> */}

        {/* <div className={classes.div}>
          <SelectCargo
            name="cargo"
            onSelected={(cargo) => {
              setIdCargo(cargo.id);
            }}
            width={450}
            idInicial={idCargo}
          />
        </div> */}

        <div className={classes.div}>
          {filiais.length !== 0 ? (
            <ListaAddFiliais
              dadosSelecionados={filiaisSelecionadas}
              dados={filiais}
              mostraLinhaSelecionada={(dado) => `${dado.id} - ${dado.nome}`}
              mostraCargoSelecionado={(dado) =>
                typeof dado.cargo === "object" ? dado.cargo.cargo : dado.cargo
              }
              mostraLinha={(dado) => `${dado.id} - ${dado.nome}`}
              tituloBotao="Vincular Filial"
              estadoBotao={false}
              titulo="Filial do Usuário"
              descricaoSelect="Filial"
              descricaoCheckBox="Principal"
              textoAdd="Adicionar"
              removerSelecao={(idSelecionado) => removerFilial(idSelecionado)}
              handleAdd={(idSelecionado, cargoSelecionado, checked) => {
                addFilial(idSelecionado, cargoSelecionado, checked);
              }}
              handleCheckbox={(lista, idSelecionado) => {
                console.log(lista);
                setFilialPadrao(idSelecionado);
                setfiliaisSelecionadas(lista);
              }}
            />
          ) : null}
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

export default withStyles(styles)(DialogCadastroUsuarios);
