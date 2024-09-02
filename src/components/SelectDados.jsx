import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { buscarTodosCargos } from "../chamadasApi/cargoApi";

const styles = (theme) => ({
  formControl: {
    //width: "650px",
    marginTop: 10,
  },
  root: {
    "&.MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#3da58a",
      },
    },
  },
});

const SelectDados = (props) => {
  const [dados, setDados] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    setDados(props.dados ?? []);
  }, []);

  useEffect(() => {
    if (props.idInicial != undefined) {
      setId(props.idInicial);
    }
  }, [props.idInicial]);

  const handleSelect = (event) => {
    dados.forEach((doc) => {
      if (doc.id === event.target.value) {
        props.onSelected(doc);
        setId(doc.id);
      }
    });
  };

  const { classes } = props;

  return (
    <div>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        style={{
          width: "auto",
          minWidth: props.width ? `${props.width}px` : "650px",
          maxWidth: "650px",
        }}
      >
        <InputLabel id="select-cargo-label">{props.titulo}</InputLabel>
        <Select
          labelId={`select-${props.label ?? "documento"}-label`}
          id={`select-${props.label}`}
          variant="outlined"
          value={id}
          label={props.titulo ?? ""}
          onChange={handleSelect}
          className={classes.root}
        >
          {dados.map((doc) => (
            <MenuItem key={doc.id} value={doc.id}>
              {doc.titulo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(SelectDados);
