import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/styles";

const CssTextField = styled(TextField)({
  "& label": {
    color: "#acc3d4",
    fontSize: "20px",
    fontWeight: "300px",
    //transform: "translate(14px, 20px) scale(1)",
  },
  "& label.Mui-focused": {
    color: "#acc3d4",
    fontSize: "20px",
    fontWeight: "600px",
  },
  "& .MuiOutlinedInput-root": {
    marginBottom: "10px",
    borderRadius: 30,
    color: "#acc3d4",
    fontWeight: "600px",
    "&:hover fieldset": {
      boxShadow: "0 4px 4px rgba(0, 0, 0, .5)",
    },
    "&.Mui-focused fieldset": {
      boxShadow: "0 4px 4px rgba(0, 0, 0, .5)",
    },
  },
});

const CampoTextoLogin = (props) => {
  return (
    <CssTextField
      {...props}
      variant="outlined"
      type={props.tipo ? props.tipo : ""}
      InputProps={{
        "data-cy": props.dataCy,
        style: { WebkitBoxShadow: "none" },
      }}
    />
  );
};

export default CampoTextoLogin;
