import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import {
  DateTimePicker,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { withStyles, styled } from "@mui/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTheme } from "@mui/material";
import { toast } from "react-toastify";
import { tokens } from "../theme";

const StyledDateTimePicker = styled(DateTimePicker)({
  width: "100%", // Garante que o DatePicker ocupe toda a largura do contêiner
});

const StyledDatePicker = styled(DatePicker)({
  width: "100%", // Garante que o DatePicker ocupe toda a largura do contêiner
});

const styles = (theme) => ({
  input: {
    color: "black",
  },
});

const FiltroData = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataInicial, setDataInicial] = useState(new Date(props.dataInicial));
  const [posicao, setPosicao] = useState("start");
  const [cor, setCor] = useState(colors.grey[300]);

  const dataAtual = new Date();

  const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
  };

  useEffect(() => {
    if (props.cor) {
      setCor(props.cor);
    }
  }, [props.cor]);

  useEffect(() => {
    setDataInicial(new Date(props.dataInicial));
  }, [props.dataInicial]);

  useEffect(() => {
    if (props.largura && props.largura < 770) {
      setPosicao("center");
    } else {
      setPosicao(props.start ? "start" : "end");
    }
  }, [props.largura, props.start]);

  const handleDateInicial = (date) => {
    if (isValidDate(date.toDate())) {
      const dateSemHoras = new Date(
        date.toDate().getFullYear(),
        date.toDate().getMonth(),
        date.toDate().getDate()
      );
      const dataAtualSemHoras = new Date(
        dataAtual.getFullYear(),
        dataAtual.getMonth(),
        dataAtual.getDate()
      );
      setDataInicial(date.toDate());
      props.onSelectDataInicial(date.toDate());
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      {props.hora ? (
        <StyledDateTimePicker
          //minDate={dayjs(dataAtual)}
          format={props.hora ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY"}
          disabled={props.disabled ?? false}
          id="date-inicial"
          label={props.titulo ?? "Data inicial"}
          value={dayjs(dataInicial)}
          onChange={handleDateInicial}
          slotProps={{
            textField: {
              size: "medium",
              variant: "outlined",
            },
          }}
          sx={{
            marginBottom: "10px",
            width: props.largura ? props.largura : "100%",
            "& .MuiOutlinedInput-root": {
              marginRight: "5px",
              color: props.largura && props.largura < 770 ? "#2f2f2f" : cor, //Cor do texto
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  props.largura && props.largura < 770
                    ? "#2f2f2f"
                    : colors.greenAccent[500], // Cor da borda quando em foco
              },
            },
            "& .MuiFormLabel-root": {
              color: props.largura && props.largura < 770 ? "#2f2f2f" : cor, // Cor do rótulo normal
            },
            "& .Mui-focused .MuiFormLabel-root": {
              color:
                props.largura && props.largura < 770
                  ? "#2f2f2f !important"
                  : `${cor} !important`, // Cor do rótulo quando em foco
            },
          }}
        />
      ) : (
        <StyledDatePicker
          //minDate={dayjs(dataAtual)}
          format={props.hora ? "DD/MM/YYYY hh:mm" : "DD/MM/YYYY"}
          id="date-inicial"
          label={props.titulo ?? "Data inicial"}
          value={dayjs(dataInicial)}
          onChange={handleDateInicial}
          slotProps={{
            textField: {
              size: "medium",
              variant: "outlined",
            },
          }}
          sx={{
            marginBottom: "10px",
            width: props.largura ? props.largura : "100%",
            "& .MuiOutlinedInput-root": {
              marginRight: "5px",
              color: props.largura && props.largura < 770 ? "#2f2f2f" : cor, //Cor do texto
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  props.largura && props.largura < 770
                    ? "#2f2f2f"
                    : colors.greenAccent[500], // Cor da borda quando em foco
              },
            },
            "& .MuiFormLabel-root": {
              color: props.largura && props.largura < 770 ? "#2f2f2f" : cor, // Cor do rótulo normal
            },
            "& .Mui-focused .MuiFormLabel-root": {
              color:
                props.largura && props.largura < 770
                  ? "#2f2f2f !important"
                  : `${cor} !important`, // Cor do rótulo quando em foco
            },
          }}
        />
      )}
    </LocalizationProvider>
  );
};

export default withStyles(styles)(FiltroData);
