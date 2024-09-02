import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const CssTextField = styled(TextField)({
  "& label": {
    color: "#acc3d4",
    fontSize: "20px",
    fontWeight: "300px",
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

const CampoSenhaLogin = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <CssTextField
      {...props}
      variant="outlined"
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="large"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
        "data-cy": props.dataCy,
      }}
    />
  );
};

export default CampoSenhaLogin;
