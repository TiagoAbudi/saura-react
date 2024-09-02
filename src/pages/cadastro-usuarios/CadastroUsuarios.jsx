import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import FabButton from "../../components/FabButton";
import { toast } from "react-toastify";
import { history } from "../../history";
import DialogCadastroUsuarios from "../../components/DialogCadastroUsuarios";
import TabelaUsuarios from "../../components/TabelaUsuarios";
import { cadastrarUsuario } from "../../chamadasApi/usuarioApi";

const CadastroUsuarios = () => {
    const [openCadastro, setOpenCadastro] = useState(false);

    const createUsuario = (usuario) => {
        cadastrarUsuario(usuario)
            .then(() => {
                setOpenCadastro(false);
                history.push("/usuarios");
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
                <Header title="Usuários" />
                <Box height='74vh'>
                    <TabelaUsuarios />
                </Box>
            </Box>
            <FabButton
                onClickAdd={() => setOpenCadastro(true)}
            />
            <DialogCadastroUsuarios
                mostrar={openCadastro}
                titulo="Cadastro Usuario"
                textoSim="Cadastrar"
                textoNao="Cancelar"
                callbackNao={() => setOpenCadastro(false)}
                callbackSim={(usuario) => createUsuario(usuario)}
            />
        </>
    );
};

export default CadastroUsuarios;
