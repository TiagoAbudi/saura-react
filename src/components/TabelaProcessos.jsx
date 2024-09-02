import React, { useEffect, useState } from "react";
import DialogAlert from "./DialogAlert";
import { GridActionsCellItem } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import CampoTabela from "./CampoTabela";
import { buscarTodosProcessos } from "../chamadasApi/processoApi";
import DialogSteps from "./DialogSteps";

const TabelaProcessos = (props) => {
  const [processo, setProcesso] = useState([]);
  //const [codAlterar, setCodAlterar] = useState(-1);
  //const [codAtivar, setCodAtivar] = useState(-1);
  //const [codExcluir, setCodExcluir] = useState(-1);
  const [idAlterar, setIdAlterar] = useState(-1);
  const [mostrarExcluir, setMostrarExcluir] = useState(false);
  const [mostrarAtivar, setMostrarAtivar] = useState(false);
  //const [codDesativar, setCodDesativar] = useState(-1);
  const [processos, setProcessos] = useState([]);
  const [colunaOrdem, setColunaOrdem] = useState("");
  const [filtro, setFiltro] = useState("");
  const [contador, setContador] = useState("0");
  const [page, setPage] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(25);
  const [ordem, setOrdem] = useState("");
  const [codigoAlterarProcesso, setCodigoAlterarProcesso] = useState(-1);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [mostrarAlterar, setMostrarAlterar] = useState(false);
  const [buscando, setBuscando] = useState(true);
  const colunas = [
    {
      field: "id",
      type: "number",
      headerName: "ID",
      renderHeader: () => <strong style={{ fontSize: "12px" }}>ID</strong>,
      align: "right",
      width: 100,
    },
    {
      field: "seguradora",
      headerName: "Seguradora",
      renderHeader: () => (
        <strong style={{ fontSize: "12px" }}>Seguradora</strong>
      ),
      align: "right",
      width: 250,
    },
    {
      field: "segurado",
      headerName: "Segurado",
      renderHeader: () => (
        <strong style={{ fontSize: "12px" }}>Segurado</strong>
      ),
      align: "left",
      width: 250,
    },
    {
      field: "corretora",
      headerName: "Corretora",
      renderHeader: () => (
        <strong style={{ fontSize: "12px" }}>Corretora</strong>
      ),
      align: "left",
      width: 250,
    },
    {
      field: "ramo",
      headerName: "Ramo",
      renderHeader: () => <strong style={{ fontSize: "12px" }}>Ramo</strong>,
      align: "left",
      width: 250,
    },
    {
      field: "analista",
      headerName: "CorreAnalistatora",
      renderHeader: () => (
        <strong style={{ fontSize: "12px" }}>Analista</strong>
      ),
      align: "left",
      width: 250,
    },
    {
      field: "ativo",
      headerName: "Ativo",
      renderHeader: () => <strong style={{ fontSize: "12px" }}>Ativo</strong>,
      align: "center",
      type: "boolean",
      width: 105,
    },
    {
      field: "Ações",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          key={"action1"}
          icon={params.row.ativo ? <CloseIcon /> : <CheckIcon />}
          label={params.row.ativo ? "Desativar" : "Ativar"}
          onClick={() =>
            params.row.ativo === true ? excluir(params.row) : ativar(params.row)
          }
          showInMenu
        />,
      ],
    },
  ];

  useEffect(() => {
    getProcessos();
  }, [linhasPorPagina, page, ordem, colunaOrdem, filtro]);

  const getProcessos = () => {
    setBuscando(true);
    buscarTodosProcessos(filtro, colunaOrdem, ordem, linhasPorPagina, page)
      .then((dados) => {
        //console.log("PROCESSOS", dados);
        setBuscando(false);
        setProcessos(dados.processos);
        setContador(dados.contador);
      })
      .catch((error) => {
        setBuscando(false);
        toast.error(`Erro ao buscar processos ${error.toString()}`, {
          theme: "colored",
        });
      });
  };

  const alterar = (cargo) => {
    setMostrarAlterar(true);
    setIdAlterar(cargo.id);
    setCodigoAlterarProcesso(cargo.id);
  };

  const excluir = (cargo) => {
    setMostrarExcluir(true);
    setIdAlterar(cargo.id);
    setProcesso(cargo);
  };

  const ativar = (cargo) => {
    const auxCargo = { ...cargo };
    auxCargo.ativo = true;
    setMostrarAtivar(true);
    setIdAlterar(cargo.id);
    setProcesso(auxCargo);
  };

  //   const desativaProcesso = () => {
  //     alterarCargo(idAlterar, { ...cargo, ativo: false })
  //       .then((resp) => {
  //         fecharDialogs();
  //         getProcessos();
  //         toast.success(`Processo ${idAlterar} desativado com sucesso`, {
  //           theme: "colored",
  //         });
  //       })
  //       .catch((error) => {
  //         toast.error("Ocorreu um erro ao desativar o processo", {
  //           theme: "colored",
  //         });
  //       });
  //   };

  //   const ativaCargo = () => {
  //     alterarCargo(idAlterar, cargo)
  //       .then((resp) => {
  //         fecharDialogs();
  //         getProcessos();
  //         toast.success(`Processo ${idAlterar} desativado com sucesso`, {
  //           theme: "colored",
  //         });
  //       })
  //       .catch((error) => {
  //         toast.error("Ocorreu um erro ao ativar o processo", {
  //           theme: "colored",
  //         });
  //       });
  //   };

  const fecharDialogs = () => {
    setMostrarAlterar(false);
    setMostrarExcluir(false);
    setMostrarAtivar(false);
    //setCodAlterar(-1);
    //setCodExcluir(-1);
    //setCodAtivar(-1);
    setIdAlterar(-1);
    setMostrarCadastro(false);
    setCodigoAlterarProcesso(-1);
  };

  const handlePagina = (pagina) => {
    setPage(pagina);
  };

  const handleLimite = (linhas) => {
    setLinhasPorPagina(linhas);
    setPage(0);
  };

  const handleFiltro = (filtro) => {
    let filter =
      filtro.items.length > 0
        ? {
            field: filtro.items[0].columnField,
            operator: filtro.items[0].operatorValue,
            value: filtro.items[0].value,
          }
        : {
            field: "",
            operator: "",
            value: "",
          };
    setPage(0);
    setFiltro(
      filter.value !== "" &&
        filter.value !== undefined &&
        (typeof filter.value == "string" ||
          (Array.isArray(filter.value) && filter.value.length > 0))
        ? filter
        : ""
    );
  };

  const handleSort = (ordenacao) => {
    setPage(0);
    setColunaOrdem(ordenacao ? ordenacao.field : "");
    setOrdem(ordenacao ? ordenacao.sort : "");
  };

  return (
    <div style={{ height: "93%" }}>
      <DialogAlert
        mostrar={mostrarAlterar}
        titulo="Deseja alterar o processo?"
        mensagem={`Deseja alterar o processo ${idAlterar}?`}
        textoSim="Sim"
        textoNao="Não"
        callbackNao={() => fecharDialogs()}
        callbackSim={() => {
          setMostrarCadastro(true);
          setMostrarAlterar(false);
          setCodigoAlterarProcesso(idAlterar);
        }}
      />

      <DialogAlert
        mostrar={mostrarExcluir}
        titulo="Deseja desativar o processo?"
        mensagem={`Deseja realmente desativar o processo ${idAlterar}?`}
        textoSim="Sim"
        textoNao="Não"
        callbackNao={() => fecharDialogs()}
        //callbackSim={() => desativaCargo()}
      />

      <DialogAlert
        mostrar={mostrarAtivar}
        titulo="Deseja ativar o processo?"
        mensagem={`Deseja ativar o processo ${idAlterar}?`}
        textoSim="Sim"
        textoNao="Não"
        callbackNao={() => fecharDialogs()}
        //callbackSim={() => ativaCargo()}
      />
      <DialogSteps
        open={mostrarCadastro}
        onClose={() => {
          fecharDialogs();
          getProcessos();
        }}
        processoId={codigoAlterarProcesso}
      />
      {/* <DialogCadastroCargo
                cargo={codigoAlterarProcesso}
                mostrar={mostrarCadastro}
                titulo="Cadastro Processo"
                textoSim="Cadastrar"
                textoNao="Cancelar"
                callbackNao={() => fecharDialogs()}
                callbackSim={(cargo) => updateCargo(cargo)}
            /> */}
      <CampoTabela
        serverOrder
        getRowId={(row) => row.id}
        rows={processos}
        columns={colunas}
        onRowClick={(params) => {
          console.log(params);
          alterar(params.row);
          setCodigoAlterarProcesso(params.row.id);
        }}
        changeFiltro={(filtro) => {
          if (filtro.items.length > 0) {
            handleFiltro(filtro);
          }
        }}
        changePage={(paginas) => handlePagina(paginas)}
        changeLinhas={(linhas) => handleLimite(linhas)}
        changeOrder={(ordenacao) => {
          handleSort(ordenacao);
        }}
        total={Number(contador)}
        pagina={Number(page)}
        linhas={Number(linhasPorPagina)}
        loading={buscando}
        titulo="PROCESSOS"
        disableSelectionOnClick
        data-cy={"tabelaProcessos"}
      />
    </div>
  );
};

export default TabelaProcessos;
