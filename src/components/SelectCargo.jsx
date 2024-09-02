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

const SelectCargo = (props) => {
  const [cargos, setCargos] = useState([]);
  const [idCargo, setIdCargo] = useState("");

  useEffect(() => {
    buscarCargos();
  }, [props.filialSelecionada]);

  useEffect(() => {
    if (props.idInicial && cargos.length > 0) {
      setIdCargo(props.idInicial);
    }
  }, [props.idInicial, cargos]);

  const buscarCargos = () => {
    buscarTodosCargos("", "", "", null, null, props.filialSelecionada ?? null)
      .then((cargos) => {
        setCargos(cargos.cargos);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao buscar a lista de cargos", {
          theme: "colored",
        });
      });
  };

  const handleSelect = (event) => {
    cargos.forEach((cargo) => {
      if (cargo.id === event.target.value) {
        props.onSelected(cargo);
        setIdCargo(cargo.id);
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
        <InputLabel id="select-cargo-label">Cargo</InputLabel>
        <Select
          labelId="select-cargo-label"
          id="select-cargo"
          variant="outlined"
          value={idCargo}
          label="Cargo"
          onChange={handleSelect}
          className={classes.root}
        >
          {cargos.map((cargo) => (
            <MenuItem key={cargo.id} value={cargo.id}>
              {cargo.cargo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(SelectCargo);
