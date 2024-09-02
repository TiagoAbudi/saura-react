import React, { useEffect, useState } from "react";
import DialogAlert from "./DialogAlert";
import { GridActionsCellItem } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DialogCadastroFiliais from "./DialogCadastroFiliais";
import { toast } from "react-toastify";
import CampoTabela from "./CampoTabela";
import { alterarFilial, buscarTodasFiliais } from "../chamadasApi/filialApi";

const TabelaFiliais = (props) => {
    //const [codAlterar, setCodAlterar] = useState(-1);
    //const [codAtivar, setCodAtivar] = useState(-1);
    //const [codExcluir, setCodExcluir] = useState(-1);
    const [idAlterar, setIdAlterar] = useState(-1);
    const [buscando, setBuscando] = useState(true);
    const [filtro, setFiltro] = useState("");
    const [colunaOrdem, setColunaOrdem] = useState("");
    const [ordem, setOrdem] = useState("");
    const [codigoAlterarFilial, setCodigoAlterarFilial] = useState(-1);
    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    const [filiais, setFiliais] = useState([]);
    const [mostrarExcluir, setMostrarExcluir] = useState(false);
    const [mostrarAlterar, setMostrarAlterar] = useState(false);
    const [mostrarAtivar, setMostrarAtivar] = useState(false);
    const [filial, setFilial] = useState([]);
    const [contador, setContador] = useState("0");
    const [page, setPage] = useState(0);
    const [linhasPorPagina, setLinhasPorPagina] = useState(25);
    const colunas = [
        {
            field: "id",
            headerName: "ID",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>ID</strong>,
            align: "right",
            width: 120,
            type: "number",
        },
        {
            field: "nome",
            headerName: "Nome",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>Nome</strong>,
            align: "left",
            width: 300,
        },
        {
            field: "empresa",
            headerName: "Empresa",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>Empresa</strong>,
            valueGetter: (params) => {
                return params.row.Empresa.razao_social;
            },
            align: "left",
            width: 350,
            filterable: false,
            sortable: false,
        },
        {
            field: "ativo",
            headerName: "Ativo",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>Ativo</strong>,
            valueGetter: (params) => {
                return params.row.ativo;
            },
            align: "right",
            headerAlign: "right",
            width: 120,
            type: "boolean",
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
        getFiliais();
    }, [linhasPorPagina, page, ordem, colunaOrdem, filtro]);

    const getFiliais = () => {
        setBuscando(true);
        buscarTodasFiliais(filtro, colunaOrdem, ordem, linhasPorPagina, page)
            .then((dados) => {
                setBuscando(false);
                setFiliais(dados.filiais);
                setContador(dados.contador);
            })
            .catch((error) => {
                setBuscando(false);
                toast.error(
                    `Erro ao buscar vendedores: ${error.response.data.message.toString()}`
                );
            });
    };

    const alterar = (filial) => {
        setMostrarAlterar(true);
        //setCodAlterar(filial.codigo);
        setIdAlterar(filial.id);
        setCodigoAlterarFilial(filial.id);
    };

    const excluir = (filial) => {
        setMostrarExcluir(true);
        //setCodExcluir(filial.codigo);
        setIdAlterar(filial.id);
        setFilial(filial);
    };

    const ativar = (filial) => {
        const auxFilial = { ...filial };
        auxFilial.ativo = true;
        setMostrarAtivar(true);
        //setCodAtivar(filial.id);
        setIdAlterar(filial.id);
        setFilial(auxFilial);
    };

    const desativaFilial = () => {
        alterarFilial(idAlterar, { ...filial, ativo: false })
            .then((resp) => {
                fecharDialogs();
                getFiliais();
                toast.success(`Filial ${idAlterar} desativada com sucesso`, {
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error("Ocorreu um erro ao desativar a filial", {
                    theme: "colored",
                });
            });
    };

    const ativaFilial = () => {
        alterarFilial(idAlterar, filial)
            .then((resp) => {
                fecharDialogs();
                getFiliais();
                toast.success(`Filial ${idAlterar} ativada com sucesso`, {
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error("Ocorreu um erro ao ativar a filial", {
                    theme: "colored",
                });
            });
    };

    const fecharDialogs = () => {
        setMostrarAlterar(false);
        setMostrarExcluir(false);
        setMostrarAtivar(false);
        //setCodAlterar(-1);
        //setCodExcluir(-1);
        //setCodAtivar(-1);
        setIdAlterar(-1);
        setMostrarCadastro(false);
        setCodigoAlterarFilial(-1);
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
        console.log(ordenacao);
        setPage(0);
        setColunaOrdem(ordenacao ? ordenacao.field : "");
        setOrdem(ordenacao ? ordenacao.sort : "");
    };

    const updateFilial = (filial) => {
        alterarFilial(codigoAlterarFilial, filial)
            .then(() => {
                fecharDialogs();
                getFiliais();
                toast.success(`Filial ${idAlterar} alterada com sucesso`, {
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error(JSON.stringify(error), { theme: "colored" });
                console.log(error);
            });
    }

    return (
        <>
            <DialogAlert
                mostrar={mostrarAlterar}
                titulo="Deseja alterar a filial?"
                mensagem={`Deseja alterar a filial ${idAlterar}?`}
                textoSim="Sim"
                textoNao="Não"
                callbackNao={() => fecharDialogs()}
                callbackSim={() => {
                    setMostrarCadastro(true);
                    setMostrarAlterar(false);
                    setCodigoAlterarFilial(idAlterar);
                }}
            />

            <DialogAlert
                mostrar={mostrarExcluir}
                titulo="Deseja desativar a filial?"
                mensagem={`Deseja realmente desativar a filial ${idAlterar}?`}
                textoSim="Sim"
                textoNao="Não"
                callbackNao={() => fecharDialogs()}
                callbackSim={() => desativaFilial()}
            />

            <DialogAlert
                mostrar={mostrarAtivar}
                titulo="Deseja ativar a filial?"
                mensagem={`Deseja ativar a filial ${idAlterar}?`}
                textoSim="Sim"
                textoNao="Não"
                callbackNao={() => fecharDialogs()}
                callbackSim={() => ativaFilial()}
            />
            {mostrarCadastro ? (
                <DialogCadastroFiliais
                    filial={codigoAlterarFilial}
                    mostrar={mostrarCadastro}
                    titulo="Cadastro Filial"
                    textoSim="Cadastrar"
                    textoNao="Cancelar"
                    callbackNao={() => fecharDialogs()}
                    callbackSim={(filial) => updateFilial(filial)}
                />
            ) : null}

            <CampoTabela
                serverOrder
                getRowId={(row) => row.id}
                rows={filiais}
                columns={colunas}
                altura="97.5%"
                onRowClick={(params) => {
                    alterar(params.row);
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
                titulo="FILIAIS"
                disableSelectionOnClick
                data-cy={"tabelaFiliais"}
            />
        </>
    );
};

export default TabelaFiliais;
