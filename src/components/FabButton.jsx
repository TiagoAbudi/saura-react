import React from "react";
import { useTheme } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/styles";
import { tokens } from "../theme";

const StyledFab = styled(Fab)({
    position: "absolute !important",
    zIndex: "1 !important",
    bottom: 10,
    right: 10,
});

const FabBtnDashboard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <StyledFab
            sx={{
                color: "white",
                background: colors.blueAccent[600],
                ':hover': {
                    background: colors.greenAccent[600],
                },
            }}
            aria-label="add"
            id="botaoAdd"
            onClick={() => props.onClickAdd()}
        >
            <AddIcon />
        </StyledFab>
    );
};

export default FabBtnDashboard;
