import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import FabButton from "../../components/FabButton";
import { toast } from "react-toastify";
import { history } from "../../history";
import DialogCadastroEmpresas from "../../components/DialogCadastroEmpresas";
import TabelaEmpresas from "../../components/TabelaEmpresas";
import { cadastrarEmpresa } from "../../chamadasApi/empresaApi";

const CadastroEmpresas = () => {
    const [openCadastro, setOpenCadastro] = useState(false);

    const createEmpresa = (empresa) => {
        cadastrarEmpresa(empresa)
            .then(() => {
                setOpenCadastro(false);
                history.push("/empresas");
            })
            .catch((error) =>
                toast.error(
                    `${error.response
                        ? error.response.data.message.toString()
                        : error
                    }`,
                    {
                        theme: "colored",
                    }
                )
            )
    }

    return (
        <>
            <Box m="20px">
                <Header title="Empresas" />
                <Box height='74vh'>
                    <TabelaEmpresas />
                </Box>
            </Box>
            <FabButton
                onClickAdd={() => setOpenCadastro(true)}
            />
            <DialogCadastroEmpresas
                mostrar={openCadastro}
                titulo="Cadastro Empresa"
                textoSim="Cadastrar"
                textoNao="Cancelar"
                callbackNao={() => setOpenCadastro(false)}
                callbackSim={(empresa) => createEmpresa(empresa)}
            />
        </>
    );
};

export default CadastroEmpresas;
