import React, { useRef, useEffect, useState, forwardRef } from "react";
import { styled } from "@mui/styles";
import { tokens } from "../theme";
import { TextField, useTheme } from "@mui/material";
import NumberFormat from "../util/NumberFormat";

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

const CampoTexto = forwardRef((props, ref) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const inputRef = useRef(null);

  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
    if (props.value) {
      setFormattedValue(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    if (props.autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.autoFocus]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    let formattedAmount = "";

    if (props.percent) {
      if (/^[0-9]*[.,]?[0-9]*$/.test(inputValue)) {
        if (
          inputValue.indexOf(".") === inputValue.lastIndexOf(".") &&
          inputValue.indexOf(",") === inputValue.lastIndexOf(",")
        ) {
          if (!(inputValue.startsWith(",") || inputValue.startsWith("."))) {
            setFormattedValue(inputValue);
            props.onChange(event);
          }
        }
      }
      return event.preventDefault();
    }

    if (
      props.tipo === "number" &&
      !props.currency &&
      inputValue.match(/[^0-9]/)
    ) {
      return event.preventDefault();
    }

    if (
      !props.tipo &&
      !props.currency &&
      inputValue.match(/[^a-zA-Z0-9\s&]/g)
    ) {
      return event.preventDefault();
    }

    if (props.currency) {
      const numericValue = inputValue.replace(/\D/g, "");

      formattedAmount =
        Number(numericValue) / 100 >= 0 ? (
          <NumberFormat>{Number(numericValue) / 100}</NumberFormat>
        ) : (
          "-"
        );

      setFormattedValue(
        formattedAmount.props.children.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        })
      );
      props.onChange(
        formattedAmount.props.children.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        })
      );
    } else {
      setFormattedValue(inputValue);
      props.onChange(event);
    }
  };

  // Encaminha a ref externa para o input interno
  useEffect(() => {
    if (ref) {
      ref.current = inputRef.current;
    }
  }, [ref]);

  return (
    <CssTextField
      {...props}
      inputRef={inputRef}
      variant="outlined"
      type={props.tipo && props.tipo !== "number" ? props.tipo : ""}
      autoComplete="new-password"
      value={formattedValue}
      onChange={handleInputChange}
      InputProps={{
        style: { color: colors ? colors.grey[100] : "white" },
        inputMode: props.tipo && props.tipo === "number" ? "numeric" : "text",
      }}
      InputLabelProps={{
        style: {
          color: colors ? colors.grey[200] : "white",
        },
      }}
      onKeyUp={(ev) => {
        if (ev.key === "Enter" && props.focusnext) {
          document.getElementById(props.focusnext).focus();
          ev.preventDefault();
        }
      }}
    />
  );
});

CampoTexto.displayName = "CampoTexto";

export default CampoTexto;
