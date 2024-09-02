import React, { useEffect } from "react";
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
    "&.MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "#3da58a",
        }
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

export const CampoSelect = (props) => {
    useEffect(() => {
        if (props.edicao && props.campoEdicao) {
            props.dados.forEach((dado) => {
                if (dado.id === props.value) props.onSelected(dado);
            });
        }
    }, [props.edicao, props.campoEdicao]);

    const handleSelect = (event) => {
        props.dados.forEach((dado) => {
            if (dado.id === event.target.value) props.onSelected(dado);
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
                display: props.display,
            }}
        >
            <InputLabel
                id="select-dado-label"
                color="primary"
                className={classes.Item}
            >
                {props.label}
            </InputLabel>
            <CssSelect
                disabled={props.desabilitado}
                variant="outlined"
                style={{
                    height: props.altura,
                    width: props.largura,
                    marginRight: props.margemDireita,
                    marginBottom: props.margemBaixo,
                }}
                labelId="select-dado-label"
                label={props.label}
                id="select-dado"
                onChange={handleSelect}
                className={classes.Item}
                color="primary"
                value={props.value}
            >
                {props.dados.map((dado) => {
                    if (dado && dado.id) {
                        return (
                            <MenuItem key={dado.id} value={dado.id} className={classes.item}>
                                {props.mostraLinha(dado)}
                            </MenuItem>
                        );
                    } else {
                        return null;
                    }
                })}
            </CssSelect>
        </FormControl>
    );
};

export default withStyles(styles)(CampoSelect);
