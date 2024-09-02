import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DialogAlert = (props) => {
  const [carregandoAlterar, setCarregandoAlterar] = useState(false);

  useEffect(() => {
    setCarregandoAlterar(props.carregandoAlterar ?? false);
  }, [props.carregandoAlterar]);

  const handleClose = () => {
    props.callbackNao();
  };

  const handleSim = () => {
    props.callbackSim();
  };

  return (
    <Dialog
      open={props.mostrar}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{props.titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ maxHeight: "50%", overflowY: "auto" }}
        >
          {props.mensagem}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.textoNao ? (
          <Button
            onClick={handleClose}
            color="primary"
            disabled={carregandoAlterar}
          >
            {props.textoNao}
          </Button>
        ) : null}
        {props.callbackSim ? (
          <Button
            onClick={handleSim}
            color="primary"
            autoFocus
            disabled={carregandoAlterar}
          >
            {props.textoSim}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default DialogAlert;
