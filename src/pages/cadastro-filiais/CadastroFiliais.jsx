import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import FabButton from "../../components/FabButton";
import { toast } from "react-toastify";
import { history } from "../../history";
import TabelaFiliais from "../../components/TabelaFiliais";
import DialogCadastroFiliais from "../../components/DialogCadastroFiliais";
import { cadastrarFilial } from "../../chamadasApi/filialApi";

const CadastroFiliais = () => {
    const [openCadastro, setOpenCadastro] = useState(false);

    const createFilial = (filial) => {
        cadastrarFilial(filial)
            .then(() => {
                setOpenCadastro(false);
                history.push("/filiais");
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
            );
    }

    return (
        <>
            <Box m="20px">
                <Header title="Filiais" />
                <Box height='74vh'>
                    <TabelaFiliais />
                </Box>
            </Box>
            <FabButton
                onClickAdd={() => setOpenCadastro(true)}
            />
            <DialogCadastroFiliais
                mostrar={openCadastro}
                titulo="Cadastro Filial"
                textoSim="Cadastrar"
                textoNao="Cancelar"
                callbackNao={() => setOpenCadastro(false)}
                callbackSim={(filial) => createFilial(filial)}
            />
        </>
    );
};

export default CadastroFiliais;
