import React, { useEffect, useState } from "react";
import DialogAlert from "./DialogAlert";
import { GridActionsCellItem } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DialogCadastroCargo from "./DialogCadastroCargos";
import { toast } from "react-toastify";
import CampoTabela from "./CampoTabela";
import { alterarCargo, buscarTodosCargos } from "../chamadasApi/cargoApi";

const TabelaCargos = (props) => {
    const [cargo, setCargo] = useState([]);
    //const [codAlterar, setCodAlterar] = useState(-1);
    //const [codAtivar, setCodAtivar] = useState(-1);
    //const [codExcluir, setCodExcluir] = useState(-1);
    const [idAlterar, setIdAlterar] = useState(-1);
    const [mostrarExcluir, setMostrarExcluir] = useState(false);
    const [mostrarAtivar, setMostrarAtivar] = useState(false);
    //const [codDesativar, setCodDesativar] = useState(-1);
    const [cargos, setCargos] = useState([]);
    const [colunaOrdem, setColunaOrdem] = useState("");
    const [filtro, setFiltro] = useState("");
    const [contador, setContador] = useState("0");
    const [page, setPage] = useState(0);
    const [linhasPorPagina, setLinhasPorPagina] = useState(25);
    const [ordem, setOrdem] = useState("");
    const [codigoAlterarCargo, setCodigoAlterarCargo] = useState(-1);
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
            width: 120,
        },
        {
            field: "codigo",
            headerName: "Código",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>Código</strong>,
            align: "right",
            type: "number",
            width: 120,
        },
        {
            field: "cargo",
            headerName: "Cargo",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>Cargo</strong>,
            align: "left",
            width: 300,
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
        getCargos();
    }, [linhasPorPagina, page, ordem, colunaOrdem, filtro]);

    const getCargos = () => {
        setBuscando(true);
        buscarTodosCargos(filtro, colunaOrdem, ordem, linhasPorPagina, page)
            .then((dados) => {
                console.log("CARGOS", dados);
                setBuscando(false);
                setCargos(dados.cargos);
                setContador(dados.contador);
            })
            .catch((error) => {
                setBuscando(false);
                toast.error(
                    `Erro ao buscar cargos ${error.response.data.message.toString()}`,
                    { theme: "colored" }
                );
            });
    };

    const alterar = (cargo) => {
        setMostrarAlterar(true);
        //setCodAlterar(cargo.codigo);
        setIdAlterar(cargo.id);
        setCodigoAlterarCargo(cargo.id);
    };

    const excluir = (cargo) => {
        setMostrarExcluir(true);
        //setCodDesativar(cargo.codigo);
        setIdAlterar(cargo.id);
        setCargo(cargo);
    };

    const ativar = (cargo) => {
        const auxCargo = { ...cargo };
        auxCargo.ativo = true;
        setMostrarAtivar(true);
        //setCodAtivar(cargo.codigo);
        setIdAlterar(cargo.id);
        setCargo(auxCargo);
    };

    const desativaCargo = () => {
        alterarCargo(idAlterar, { ...cargo, ativo: false })
            .then((resp) => {
                fecharDialogs();
                getCargos();
                toast.success(`Cargo ${idAlterar} desativado com sucesso`, {
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error("Ocorreu um erro ao desativar o cargo", {
                    theme: "colored",
                });
            });
    };

    const ativaCargo = () => {
        alterarCargo(idAlterar, cargo)
            .then((resp) => {
                fecharDialogs();
                getCargos();
                toast.success(`Cargo ${idAlterar} desativado com sucesso`, {
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error("Ocorreu um erro ao ativar o cargo", {
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
        setCodigoAlterarCargo(-1);
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

    const updateCargo = (cargo) => {
        alterarCargo(codigoAlterarCargo, cargo)
            .then(() => {
                fecharDialogs();
                getCargos();
                toast.success(`Cargo ${idAlterar} alterado com sucesso`, {
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error(
                    `Erro ao alterar cargo: ${error.response.data.message.toString()}`,
                    {
                        theme: "colored",
                    }
                );
            });
    }

    return (
        <div style={{ height: "93%" }}>
            <DialogAlert
                mostrar={mostrarAlterar}
                titulo="Deseja alterar o cargo?"
                mensagem={`Deseja alterar o cargo ${idAlterar}?`}
                textoSim="Sim"
                textoNao="Não"
                callbackNao={() => fecharDialogs()}
                callbackSim={() => {
                    setMostrarCadastro(true);
                    setMostrarAlterar(false);
                    setCodigoAlterarCargo(idAlterar);
                }}
            />

            <DialogAlert
                mostrar={mostrarExcluir}
                titulo="Deseja desativar o cargo?"
                mensagem={`Deseja realmente desativar o cargo ${idAlterar}?`}
                textoSim="Sim"
                textoNao="Não"
                callbackNao={() => fecharDialogs()}
                callbackSim={() => desativaCargo()}
            />

            <DialogAlert
                mostrar={mostrarAtivar}
                titulo="Deseja ativar o cargo?"
                mensagem={`Deseja ativar o cargo ${idAlterar}?`}
                textoSim="Sim"
                textoNao="Não"
                callbackNao={() => fecharDialogs()}
                callbackSim={() => ativaCargo()}
            />
            <DialogCadastroCargo
                cargo={codigoAlterarCargo}
                mostrar={mostrarCadastro}
                titulo="Cadastro Cargo"
                textoSim="Cadastrar"
                textoNao="Cancelar"
                callbackNao={() => fecharDialogs()}
                callbackSim={(cargo) => updateCargo(cargo)}
            />
            <CampoTabela
                serverOrder
                getRowId={(row) => row.id}
                rows={cargos}
                columns={colunas}
                onRowClick={(params) => {
                    alterar(params.row);
                    setCodigoAlterarCargo(params.row.id);
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
                titulo="CARGOS"
                disableSelectionOnClick
                data-cy={"tabelaCargos"}
            />
        </div>
    );
};

export default TabelaCargos;
