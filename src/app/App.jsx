import React, { useState } from "react";
import Topbar from "../components/TopBar";
import Sidebar from "../components/SideBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import { FiltroContextProvider } from "../context/FiltroContext";
import { ToastContainer } from "react-toastify";
import Routes from "../routes/Routes";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const token =
        localStorage.getItem("app-token") != null
            ? localStorage.getItem("app-token")
            : 1;

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    {token !== null ?
                        <>
                            <Sidebar isSidebar={isSidebar} />
                            <main className="content">
                                <FiltroContextProvider>
                                    <Topbar setIsSidebar={setIsSidebar} />
                                    <ToastContainer />
                                    <Routes />
                                </FiltroContextProvider>
                            </main>
                        </> :
                        <>
                            <main className="content">
                                <FiltroContextProvider>
                                    <ToastContainer />
                                    <Routes />
                                </FiltroContextProvider>
                            </main>
                        </>
                    }
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
