import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import FabButton from "../../components/FabButton";
import { toast } from "react-toastify";
//import DialogCadastroCargo from "../../components/DialogCadastroCargos";
import { history } from "../../history";
import TabelaProcessos from "../../components/TabelaProcessos";
import DialogSteps from "../../components/DialogSteps";

const CadastroProcessos = () => {
  const [openCadastro, setOpenCadastro] = useState(false);

  return (
    <>
      <Box m="20px">
        <Header title="Processos" />
        <Box height="74vh">
          <TabelaProcessos />
        </Box>
      </Box>
      <FabButton onClickAdd={() => setOpenCadastro(true)} />
      {/* <DialogCadastroCargo
        mostrar={openCadastro}
        titulo="Cadastro Cargo"
        textoSim="Cadastrar"
        textoNao="Cancelar"
        callbackNao={() => setOpenCadastro(false)}
        callbackSim={(cargo) => createCargo(cargo)}
      /> */}
      <DialogSteps open={openCadastro} onClose={() => setOpenCadastro(false)} />
    </>
  );
};

export default CadastroProcessos;
