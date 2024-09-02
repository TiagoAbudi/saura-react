import React, { Component, useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { buscarTodasEmpresas } from "../chamadasApi/empresaApi";

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

const SelectEmpresa = (props) => {
  const [empresas, setEmpresas] = useState([]);
  const [idEmpresa, setIdEmpresa] = useState("");

  useEffect(() => {
    buscarEmpresas();
  }, []);

  useEffect(() => {
    if (props.idInicial && empresas.length > 0) {
      setIdEmpresa(props.idInicial);
    }
  }, [props.idInicial, empresas]);

  const buscarEmpresas = () => {
    buscarTodasEmpresas()
      .then((empresas) => {
        setEmpresas(empresas.empresas);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao buscar a lista de empresas", {
          theme: "colored",
        });
      });
  };

  const handleSelect = (event) => {
    empresas.forEach((empresa) => {
      if (empresa.id === event.target.value) {
        props.onSelected(empresa);
        setIdEmpresa(empresa.id);
        if (props.focusnext) {
          setTimeout(() => {
            document.getElementById(props.focusnext).focus();
          }, 100);
        }
      }
    });
  };

  const { classes } = props;

  return (
    <div style={{ width: props.width ?? "100%" }}>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        style={{
          width: props.width ?? "100%",
          // minWidth: props.width ? `${props.width}px` : "650px",
          // maxWidth: "650px",
        }}
      >
        <InputLabel id="select-empresa-label">Empresa</InputLabel>
        <Select
          labelId="select-empresa-label"
          id="select-empresa"
          variant="outlined"
          value={idEmpresa}
          label="Empresa"
          onChange={handleSelect}
          className={classes.root}
        >
          {/* <MenuItem value={0}>
            <em>None</em>
          </MenuItem> */}
          {empresas.map((empresa) => (
            <MenuItem key={empresa.id} value={empresa.id}>
              {empresa.razao_social}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(SelectEmpresa);
