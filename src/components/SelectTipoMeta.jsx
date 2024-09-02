import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        "&.MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#3da58a",
            },
        },
    },
});

const SelectTipoMeta = (props) => {
    const classes = useStyles(props);
    const [idTipo, setIdTipo] = useState(0);
    const [colors, setColors] = useState(null);

    const tipos = [
        { id: 0, nome: "Sem tipo" },
        { id: 1, nome: "por dia" },
        { id: 2, nome: "por semana" },
        { id: 3, nome: "por mês" },
    ];

    useEffect(() => {
        setIdTipo(props.id_meta);
    }, [props.id_meta]);

    useEffect(() => {
        if (props.colors) {
            setColors(props.colors);
        }
    }, [props.color]);

    const handleSelect = (event) => {
        tipos.forEach((tipo) => {
            if (tipo.id === event.target.value) {
                props.onSelected(tipo);
            }
        });
    };

    return (
        <div style={{ marginLeft: "8px", marginTop: "8px" }}>
            <FormControl fullWidth>
                <InputLabel
                    id="select-tipo-label"
                    style={{ color: colors ? colors.grey[200] : "white" }}
                >
                    Tipo da meta
                </InputLabel>
                <Select
                    labelId="select-tipo-label"
                    label="Tipo da meta"
                    id="select-tipo"
                    required={true}
                    onChange={handleSelect}
                    value={idTipo}
                    className={classes.root}>
                    {tipos.map((tipo) => (
                        <MenuItem key={tipo.id} value={tipo.id}>
                            {tipo.nome}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectTipoMeta;
