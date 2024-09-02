import React, { Component, useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
// import jwt_decode from "jwt-decode";

const styles = (theme) => ({
  formControl: {
    // margin: 0,
    // width: "200px",
    //marginTop: 10,
  },
  root: {
    "&.MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#3da58a",
      }
    },
  }
});

const SelectLicencas = (props) => {
  const [licencas, setLicencas] = useState([]);
  const [idLicenca, setIdLicenca] = useState("");
//   const token = localStorage.getItem("app-token");
//   const payload = jwt_decode(token);

  useEffect(() => {
    buscarLicenca();
  }, []);

  useEffect(() => {
    if (props.idInicial && licencas.length > 0) {
      setIdLicenca(props.idInicial);
    }
  }, [props.idInicial, licencas]);

  const buscarLicenca = () => {

  };

  const handleSelect = (event) => {
    licencas.forEach((licenca) => {
      if (licenca.id === event.target.value) {
        props.onSelected(licenca);
        setIdLicenca(licenca.id);
      }
    });
  };

  const { classes } = props;

  return (
    <div style={{width: props.width ?? "100%"}}>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        style={{
          width: props.width ?? "100%",
          // minWidth: props.width ? `${props.width}px` : "650px",
          // maxWidth: "650px",
        }}
      >
        <InputLabel id="select-licenca-label">Licença</InputLabel>
        <Select
          labelId="select-licenca-label"
          id="select-licenca"
          variant="outlined"
          value={idLicenca}
          label="Licença"
          onChange={handleSelect}
          className={classes.root}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {licencas.map((licenca) => (
            <MenuItem key={licenca.id} value={licenca.id}>
              {licenca.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(SelectLicencas);
