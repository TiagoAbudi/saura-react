import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SelectTipoMeta from "./SelectTipoMeta";
import { toast } from "react-toastify";
import CampoTexto from "./CampoTexto";
import NumberFormat from "../util/NumberFormat";

const DialogMeta = (props) => {
    const [valorMeta, setValorMeta] = useState("");
    const [idTipoMeta, setIdTipoMeta] = useState(0);
    const [textoTipoMeta, setTextoTipoMeta] = useState("");
    const [colors, setColors] = useState(null);

    useEffect(() => {
        if (props.mostrar && props.meta) {
            if (props.meta.tipo === "por dia") {
                setIdTipoMeta(1);
                setTextoTipoMeta("por dia");
            } else if (props.meta.tipo === "por semana") {
                setIdTipoMeta(2);
                setTextoTipoMeta("por semana");
            } else if (props.meta.tipo === "por mês") {
                setIdTipoMeta(3);
                setTextoTipoMeta("por mês");
            }

            if (props.meta.meta) {
                const formattedAmount =
                    Number(props.meta.meta) >= 0 ? (
                        <NumberFormat>{Number(props.meta.meta)}</NumberFormat>
                    ) : (
                        ""
                    );

                setValorMeta(
                    formattedAmount.props.children.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    })
                );
            }
        }
    }, [props.mostrar]);

    useEffect(() => {
        if (props.colors) {
            setColors(props.colors);
        }
    }, [props.color]);

    const handleClose = () => {
        setValorMeta("");
        props.callbackNao();
    };

    const handleSim = () => {
        if (!valorMeta) {
            toast.error("Preencha um valor para a meta", { theme: "colored" });
            return;
        }
        if (!textoTipoMeta || textoTipoMeta === "Sem tipo") {
            toast.error("Selecione um tipo para a meta", { theme: "colored" });
            return;
        }

        const valorNumerico = parseFloat(
            valorMeta
                .replace(/[^\d,.-]/g, "")
                .replaceAll(".", "")
                .replace(",", ".")
        );

        props.callbackSim({ valorNumerico, textoTipoMeta });
    };

    return (
        <Dialog
            open={props.mostrar}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">{props.titulo}</DialogTitle>
            <DialogContent>
                <center>
                    <DialogContentText
                        id="alert-dialog-description"
                        style={{ maxHeight: "50%", overflowY: "auto" }}
                    >
                        Digite o valor e o tipo que deseja para a meta
                    </DialogContentText>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <CampoTexto
                            style={{ width: "200px", marginTop: "8px", marginRight: "4px" }}
                            label="Valor da meta"
                            name="valor_meta"
                            id="valor_meta"
                            value={valorMeta}
                            variant="outlined"
                            required={true}
                            onChange={(e) => {
                                console.log(e);
                                setValorMeta(e);
                            }}
                            currency="true"
                            autoFocus
                        />

                        <SelectTipoMeta
                            name="supervisor"
                            colors={colors}
                            id_meta={idTipoMeta}
                            onSelected={(tipo) => {
                                setIdTipoMeta(tipo.id);
                                setTextoTipoMeta(tipo.nome);
                            }}
                        />
                    </div>
                </center>
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

export default DialogMeta;
