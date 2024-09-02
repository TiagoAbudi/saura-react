import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CampoTabela from "./CampoTabela";

const DialogAlertItensFiliais = (props) => {
    const [page, setPage] = useState("0");
    const [linhasPorPagina, setLinhasPorPagina] = useState("25");
    const [colunaOrdem, setColunaOrdem] = useState("");
    const [ordem, setOrdem] = useState("");
    const [filtro, setFiltro] = useState(undefined);

    const handleClose = () => {
        props.callbackNao();
    };

    const handleSim = () => {
        props.callbackSim();
    };

    const handlePaginaItens = (pagina) => {
        setPage(pagina);
    };

    const handleLimiteItens = (linhas) => {
        setPage(0);
        setLinhasPorPagina(linhas);
    };

    const handleSortItens = (ordenacao) => {
        setPage(0);
        setColunaOrdem(ordenacao ? ordenacao.field : "");
        setOrdem(ordenacao ? ordenacao.sort : "");
    };

    const handlefiltroItens = (filtro) => {
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
        setLinhasPorPagina(linhasPorPagina);
        setFiltro(
            filter.value !== "" &&
                filter.value !== undefined &&
                (typeof filter.value == "string" ||
                    (Array.isArray(filter.value) && filter.value.length > 0))
                ? filter
                : ""
        );
    };

    return (
        <Dialog
            open={props.mostrar}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={false}
            maxWidth="lg"
        >
            <DialogTitle id="alert-dialog-title">{props.titulo}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.mensagem}
                </DialogContentText>
                <CampoTabela
                    getRowId={(row) => row.id}
                    rows={props.linhas}
                    columns={props.colunas}
                    altura={props.altura}
                    largura={props.largura}
                    onRowClick={props.onRowClick}
                    changePage={(pagina) => handlePaginaItens(pagina)}
                    changeLinhas={(linhas) => handleLimiteItens(linhas)}
                    changeFiltro={(filtro) => {
                        handlefiltroItens(filtro);
                    }}
                    changeOrder={(ordenacao) => {
                        handleSortItens(ordenacao);
                    }}
                    total={props.linhas.length}
                    pagina={Number(page)}
                    linhas={Number(linhasPorPagina)}
                    localOrder
                    disableSelectionOnClick
                    
                />
            </DialogContent>
            <DialogActions>
                {props.callbackSim ? (
                    <Button onClick={handleSim} color="primary" autoFocus>
                        {props.textoSim}
                    </Button>
                ) : null}
                <Button onClick={handleClose} color="primary">
                    {props.textoNao}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogAlertItensFiliais;
