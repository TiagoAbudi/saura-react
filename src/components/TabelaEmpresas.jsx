import React, { useEffect, useState } from "react";
import DialogAlert from "./DialogAlert";
import { GridActionsCellItem } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DialogCadastroEmpresas from "./DialogCadastroEmpresas";
import { toast } from "react-toastify";
import CampoTabela from "./CampoTabela";
import { alterarEmpresa, buscarTodasEmpresas } from "../chamadasApi/empresaApi";

const TabelaEmpresas = (props) => {
    const [idAlterar, setIdAlterar] = useState(-1);
    const [buscando, setBuscando] = useState(true);
    const [filtro, setFiltro] = useState("");
    const [colunaOrdem, setColunaOrdem] = useState("");
    const [ordem, setOrdem] = useState("");
    const [codigoAlterarEmpresa, setCodigoAlterarEmpresa] = useState(-1);
    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    const [empresas, setEmpresas] = useState([]);
    const [mostrarExcluir, setMostrarExcluir] = useState(false);
    const [mostrarAlterar, setMostrarAlterar] = useState(false);
    const [mostrarAtivar, setMostrarAtivar] = useState(false);
    const [empresa, setEmpresa] = useState([]);
    const [contador, setContador] = useState("0");
    const [page, setPage] = useState(0);
    const [linhasPorPagina, setLinhasPorPagina] = useState(25);
    const colunas = [
        {
            field: "id",
            headerName: "ID",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>ID</strong>,
            align: "right",
            width: 50,
            type: "number",
        },
        {
            field: "cnpj",
            headerName: "CNPJ",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>CNPJ</strong>,
            align: "left",
            width: 120,
        },
        {
            field: "nome_fantasia",
            headerName: "Nome Fantasia",
            renderHeader: () => (
                <strong style={{ fontSize: "12px" }}>Nome Fantasia</strong>
            ),
            align: "left",
            width: 250,
        },
        {
            field: "razao_social",
            headerName: "Razão Social",
            renderHeader: () => (
                <strong style={{ fontSize: "12px" }}>Razão Social</strong>
            ),
            align: "left",
            width: 350,
        },
        {
            field: "ativo",
            headerName: "Ativo",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>Ativo</strong>,
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
        getEmpresas();
    }, [linhasPorPagina, page, ordem, colunaOrdem, filtro]);

    const getEmpresas = () => {
        setBuscando(true);
        buscarTodasEmpresas(filtro, colunaOrdem, ordem, linhasPorPagina, page)
            .then((dados) => {
                setBuscando(false);
                setEmpresas(dados.empresas);
                setContador(dados.contador);
            })
            .catch((error) => {
                setBuscando(false);
                toast.error(
                    `Erro ao buscar vendedores: ${error.response.data.message.toString()}`
                );
            });
    };

    const alterar = (empresa) => {
        setMostrarAlterar(true);
        //setCodAlterar(empresa.id);
        setIdAlterar(empresa.id);
        setCodigoAlterarEmpresa(empresa.id);
    };

    const excluir = (empresa) => {
        setMostrarExcluir(true);
        //setCodExcluir(empresa.id);
        setIdAlterar(empresa.id);
        setEmpresa(empresa);
    };

    const ativar = (empresa) => {
        const auxEmpresa = { ...empresa };
        auxEmpresa.ativo = true;
        setMostrarAtivar(true);
        //setCodAtivar(empresa.id);
        setIdAlterar(empresa.id);
        setEmpresa(auxEmpresa);
    };

    const desativaEmpresa = () => {
        alterarEmpresa(idAlterar, { ...empresa, ativo: false })
            .then((resp) => {
                fecharDialogs();
                getEmpresas();
                toast.success(`Empresa ${idAlterar} desativada com sucesso`, {
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error("Ocorreu um erro ao desativar a empresa", {
                    theme: "colored",
                });
            });
    };

    const ativaEmpresa = () => {
        alterarEmpresa(idAlterar, empresa)
            .then((resp) => {
                fecharDialogs();
                getEmpresas();
                toast.success(`Empresa ${idAlterar} ativada com sucesso`, {
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error("Ocorreu um erro ao ativar a empresa", {
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
        setCodigoAlterarEmpresa(-1);
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

    const updateEmpresa = (empresa) => {
        alterarEmpresa(idAlterar, empresa)
            .then(() => {
                fecharDialogs();
                getEmpresas();
                toast.success(`Empresa ${idAlterar} alterada com sucesso`, {
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error(
                    `Erro ao alterar empresa: ${error.response.data.message.toString()}`,
                    {
                        theme: "colored",
                    }
                );
            });
    }

    return (
        <>
            <DialogAlert
                mostrar={mostrarAlterar}
                titulo="Deseja alterar a empresa?"
                mensagem={`Deseja alterar a empresa ${idAlterar}?`}
                textoSim="Sim"
                textoNao="Não"
                callbackNao={() => fecharDialogs()}
                callbackSim={() => {
                    setMostrarCadastro(true);
                    setMostrarAlterar(false);
                    setCodigoAlterarEmpresa(idAlterar);
                }}
            />

            <DialogAlert
                mostrar={mostrarExcluir}
                titulo="Deseja desativar a empresa?"
                mensagem={`Deseja realmente desativar a empresa ${idAlterar}?`}
                textoSim="Sim"
                textoNao="Não"
                callbackNao={() => fecharDialogs()}
                callbackSim={() => desativaEmpresa()}
            />

            <DialogAlert
                mostrar={mostrarAtivar}
                titulo="Deseja ativar a empresa?"
                mensagem={`Deseja ativar a empresa ${idAlterar}?`}
                textoSim="Sim"
                textoNao="Não"
                callbackNao={() => fecharDialogs()}
                callbackSim={() => ativaEmpresa()}
            />
            <DialogCadastroEmpresas
                empresa={codigoAlterarEmpresa}
                mostrar={mostrarCadastro}
                titulo="Cadastro Empresa"
                textoSim="Cadastrar"
                textoNao="Cancelar"
                callbackNao={() => fecharDialogs()}
                callbackSim={(empresa) => updateEmpresa(empresa)}
            />
            <CampoTabela
                serverOrder
                getRowId={(row) => row.id}
                rows={empresas}
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
                titulo="EMPRESAS"
                disableSelectionOnClick
                data-cy={"tabelaEmpresas"}
            />
        </>
    );
};

export default TabelaEmpresas;
