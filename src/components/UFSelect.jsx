import React, { Component, useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/styles";

const CssSelect = styled(Select)({
  "& label": {
    color: "black",
  },
  "& label.Mui-focused": {
    color: "#038C33",
  },
  "& .MuiOutlinedInput-root": {
    color: "black",
    height: "40px",
    "&:hover fieldset": {
      borderColor: "#03A62C",
      boxShadow: "0 4px 4px rgba(0, 0, 0, .5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#038C33",
      boxShadow: "0 4px 4px rgba(0, 0, 0, .5)",
    },
  },
});

const styles = (theme) => ({
  formControl: {
    color: "black",
  },
  item: {
    color: "black",
  },
  label: {
    "&:fieldset": {
      color: "green",
    },
  },
});

const UFSelect = (props) => {
  const states = [
    {
      estado: "",
      uf: "",
    },
    {
      estado: "Acre",
      uf: "AC",
    },
    {
      estado: "Alagoas",
      uf: "AL",
    },
    {
      estado: "Amapá",
      uf: "AP",
    },
    {
      estado: "Amazonas",
      uf: "AM",
    },
    {
      estado: "Bahia",
      uf: "BA",
    },
    {
      estado: "Ceará",
      uf: "CE",
    },
    {
      estado: "Distrito Federal",
      uf: "DF",
    },
    {
      estado: "Espírito Santo",
      uf: "ES",
    },
    {
      estado: "Goiás",
      uf: "GO",
    },
    {
      estado: "Maranhão",
      uf: "MA",
    },
    {
      estado: "Mato Grosso",
      uf: "MT",
    },
    {
      estado: "Mato Grosso do Sul",
      uf: "MS",
    },
    {
      estado: "Minas Gerais",
      uf: "MG",
    },
    {
      estado: "Pará",
      uf: "PA",
    },
    {
      estado: "Paraíba",
      uf: "PB",
    },
    {
      estado: "Paraná",
      uf: "PR",
    },
    {
      estado: "Pernambuco",
      uf: "PE",
    },
    {
      estado: "Piauí",
      uf: "PI",
    },
    {
      estado: "Rio de Janeiro",
      uf: "RJ",
    },
    {
      estado: "Rio Grande do Norte",
      uf: "RN",
    },
    {
      estado: "Rio Grande do Sul",
      uf: "RS",
    },
    {
      estado: "Rondônia",
      uf: "RO",
    },
    {
      estado: "Roraima",
      uf: "RR",
    },
    {
      estado: "Santa Catarina",
      uf: "SC",
    },
    {
      estado: "São Paulo",
      uf: "SP",
    },
    {
      estado: "Sergipe",
      uf: "SE",
    },
    {
      estado: "Tocantins",
      uf: "TO",
    },
  ];
  const [estadoSelecionado, setEstadoSelecionado] = useState({
    estado: "",
    uf: "",
  });

  useEffect(() => {
    if (props.value) {
      const estado = states.find((state) => state.estado === props.value);
      if (estado) {
        setEstadoSelecionado(estado);
      }
    }
  }, [props.value]);

  const handleSelect = (event) => {
    states.forEach((dado) => {
      if (dado.estado === event.target.value) {
        setEstadoSelecionado(dado);
        props.onSelected(dado);
      }
    });
  };

  const { classes } = props;

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      style={{
        width: props.largura,
        marginRight: props.margemDireita,
      }}
    >
      <InputLabel id="select-dado-label" color="secondary">
        {props.label}
      </InputLabel>
      <CssSelect
        labelId="select-dado-label"
        id="select-uf"
        variant="outlined"
        value={estadoSelecionado.estado}
        label="UF"
        onChange={handleSelect}
        className={classes.Item}
        color="secondary"
      >
        {/* <MenuItem
          value=""
          style={{ color: "black" }}
          className={classes.item}
        >
          <em>None</em>
        </MenuItem> */}
        {states.map((dado) => (
          <MenuItem
            key={dado.uf}
            value={dado.estado}
            className={classes.item}
          >
            {dado.uf}
          </MenuItem>
        ))}
      </CssSelect>
    </FormControl>
  );
};

export default withStyles(styles)(UFSelect);
