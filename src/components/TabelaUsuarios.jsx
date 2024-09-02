import React, { Component, useEffect, useState } from "react";
import DialogAlert from "./DialogAlert";
import { history } from "../history";
import { GridActionsCellItem } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DialogCadastroUsuarios from "./DialogCadastroUsuarios";
import { toast } from "react-toastify";
import CampoTabela from "./CampoTabela";
import { alterarUsuario, buscarTodosUsuarios } from "../chamadasApi/usuarioApi";

const TabelaUsuarios = (props) => {
    const [codAlterar, setCodAlterar] = useState(-1);
    //const [codAtivar, setCodAtivar] = useState(-1);
    //const [codExcluir, setCodExcluir] = useState(-1);
    const [idAlterar, setIdAlterar] = useState(-1);
    const [buscando, setBuscando] = useState(true);
    const [filtro, setFiltro] = useState("");
    const [colunaOrdem, setColunaOrdem] = useState("");
    const [ordem, setOrdem] = useState("");
    const [codigoAlterarUsuario, setCodigoAlterarUsuario] = useState(-1);
    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarExcluir, setMostrarExcluir] = useState(false);
    const [mostrarAlterar, setMostrarAlterar] = useState(false);
    const [mostrarAtivar, setMostrarAtivar] = useState(false);
    const [usuario, setUsuario] = useState([]);
    const [contador, setContador] = useState("0");
    const [page, setPage] = useState(0);
    const [codigoSenha, setCodigoSenha] = useState("0");
    const [linhasPorPagina, setLinhasPorPagina] = useState(25);
    const colunas = [
        {
            field: "id",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>ID</strong>,
            align: "right",
            width: 120,
            type: "number"
        },
        {
            field: "nome",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>Nome</strong>,
            align: "left",
            width: 250,
        },
        {
            field: "id_empresa",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>Empresa</strong>,
            align: "right",
            width: 120,
            type: "number"
        },
        {
            field: "id_filial",
            renderHeader: () => (
                <strong style={{ fontSize: "12px" }}>ID Filial</strong>
            ),
            align: "right",
            width: 120,
            type: "number"
        },
        {
            field: "ativo",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>Ativo</strong>,
            align: "right",
            headerAlign: "right",
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
                        params.row.ativo == true ? excluir(params.row) : ativar(params.row)
                    }
                    showInMenu
                />,
            ],
        },
    ];

    useEffect(() => {
        getUsuarios();
    }, [linhasPorPagina, page, ordem, colunaOrdem, filtro]);

    const getUsuarios = () => {
        setBuscando(true);
        buscarTodosUsuarios(filtro, colunaOrdem, ordem, linhasPorPagina, page)
            .then((dados) => {
                setBuscando(false);
                setUsuarios(dados.usuarios);
                setContador(dados.contador);
            })
            .catch((error) => {
                setBuscando(false);
                toast.error(
                    `Erro ao buscar vendedores: ${error.response.data.message.toString()}`
                );
            });
    };

    const alterar = (usuario) => {
        setMostrarAlterar(true);
        setCodAlterar(usuario.codigo);
        setIdAlterar(usuario.id);
        setCodigoAlterarUsuario(usuario.id);
    };

    const excluir = (usuario) => {
        setMostrarExcluir(true);
        //setCodExcluir(usuario.codigo);
        setIdAlterar(usuario.id);
        setUsuario(usuario);
    };

    const ativar = (usuario) => {
        const auxUsuario = { ...usuario };
        auxUsuario.ativo = true;
        setMostrarAtivar(true);
        //setCodAtivar(usuario.codigo);
        setIdAlterar(usuario.id);
        setUsuario(auxUsuario);
    };

    const desativaUsuario = () => {
        alterarUsuario(idAlterar, { ...usuario, ativo: false })
            .then((resp) => {
                fecharDialogs();
                getUsuarios();
                toast.success(`Usuário ${idAlterar} desativado com sucesso`, {
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error("Ocorreu um erro ao desativar o usuário", {
                    theme: "colored",
                });
            });
    };

    const ativaUsuario = () => {
        alterarUsuario(idAlterar, usuario)
            .then((resp) => {
                fecharDialogs();
                getUsuarios();
                toast.success(`Usuário ${idAlterar} ativado com sucesso`, {
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error("Ocorreu um erro ao ativar o usuário", {
                    theme: "colored",
                });
            });
    };

    const fecharDialogs = () => {
        setMostrarAlterar(false);
        setMostrarExcluir(false);
        setMostrarAtivar(false);
        setCodAlterar(-1);
        //setCodExcluir(-1);
        //setCodAtivar(-1);
        setIdAlterar(-1);
        setMostrarCadastro(false);
        setCodigoAlterarUsuario(-1);
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

    const updateUsuario = (usuario) => {
        alterarUsuario(codigoAlterarUsuario, usuario)
            .then(() => {
                fecharDialogs();
                getUsuarios();
            })
            .catch((error) => {
                toast.error(
                    `Erro ao alterar usuário: ${error.response.data.message.toString()}`,
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
                titulo="Deseja alterar o usuário?"
                mensagem={`Deseja alterar o usuário ${idAlterar}?`}
                textoSim="Sim"
                textoNao="Não"
                callbackNao={() => fecharDialogs()}
                callbackSim={() => {
                    setMostrarCadastro(true);
                    setMostrarAlterar(false);
                    setCodigoAlterarUsuario(idAlterar);
                }}
            />

            <DialogAlert
                mostrar={mostrarExcluir}
                titulo="Deseja desativar o usuário?"
                mensagem={`Deseja realmente desativar o usuário ${idAlterar}?`}
                textoSim="Sim"
                textoNao="Não"
                callbackNao={() => fecharDialogs()}
                callbackSim={() => desativaUsuario()}
            />

            <DialogAlert
                mostrar={mostrarAtivar}
                titulo="Deseja ativar o usuário?"
                mensagem={`Deseja ativar o usuário ${idAlterar}?`}
                textoSim="Sim"
                textoNao="Não"
                callbackNao={() => fecharDialogs()}
                callbackSim={() => ativaUsuario()}
            />

            <DialogCadastroUsuarios
                usuario={codigoAlterarUsuario}
                mostrar={mostrarCadastro}
                titulo="Cadastro Usuario"
                textoSim="Cadastrar"
                textoNao="Cancelar"
                callbackNao={() => fecharDialogs()}
                callbackSim={(usuario) => updateUsuario(usuario)}
            />

            <CampoTabela
                serverOrder
                getRowId={(row) => row.id}
                rows={usuarios}
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
                titulo="USUARIOS"
                disableSelectionOnClick
                data-cy={"tabelaUsuarios"}
            />
        </>
    );
};

export default TabelaUsuarios;
