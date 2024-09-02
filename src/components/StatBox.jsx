import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { useEffect, useState } from "react";

const StatBox = ({ title, subtitle, icon }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" mt="2px">
                <Typography variant={width < 770 ? "subtitle2" : "h5"} sx={{ color: colors.greenAccent[500] }}>
                    {subtitle}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography
                        variant={width < 770 ? "subtitle1" : "h4"}
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}
                    >
                        {title}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default StatBox;