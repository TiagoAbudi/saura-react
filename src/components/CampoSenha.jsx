import React, { useRef, useEffect, forwardRef } from "react";
import { styled } from "@mui/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useTheme, TextField } from "@mui/material";
import { tokens } from "../theme";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "black",
    "&:hover fieldset": {
      boxShadow: "0 4px 4px rgba(0, 0, 0, .5)",
    },
    "&.Mui-focused fieldset": {
      boxShadow: "0 4px 4px rgba(0, 0, 0, .5)",
      borderColor: "#3da58a",
    },
  },
});

const CampoSenha = forwardRef((props, ref) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showPassword, setShowPassword] = React.useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (props.autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.autoFocus]);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseEvents = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (ref) {
      ref.current = inputRef.current;
    }
  }, [ref]);

  return (
    <CssTextField
      {...props}
      id="outlined-adornment-password"
      inputRef={inputRef}
      type={showPassword ? "text" : "password"}
      InputProps={{
        style: { color: colors ? colors.grey[100] : "white" },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseEvents}
              edge="end"
              size="large"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        style: {
          color: colors ? colors.grey[200] : "white",
        },
      }}
      inputProps={{ "data-cy": "password" }}
      onKeyUp={(ev) => {
        if (ev.key === "Enter" && props.focusnext) {
          document.getElementById(props.focusnext).focus();
          ev.preventDefault();
        }
      }}
    />
  );
});

CampoSenha.displayName = "CampoSenha";

export default CampoSenha;
