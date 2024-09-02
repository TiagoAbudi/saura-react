import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import TabelaCargos from "../../components/TabelaCargos";
import FabButton from "../../components/FabButton";
import { toast } from "react-toastify";
import DialogCadastroCargo from "../../components/DialogCadastroCargos";
import { history } from "../../history";
import { cadastrarCargo } from "../../chamadasApi/cargoApi";

const CadastroCargos = () => {
  const [openCadastro, setOpenCadastro] = useState(false);

  const createCargo = (cargo) => {
    cadastrarCargo(cargo)
      .then(() => {
        setOpenCadastro(false);
        history.push("/cargos");
      })
      .catch((error) =>
        toast.error(
          `${error.response ? error.response.data.message.toString() : error}`,
          {
            theme: "colored",
          }
        )
      );
  };

  return (
    <>
      <Box m="20px">
        <Header title="Cargos" />
        <Box height="74vh">
          <TabelaCargos />
        </Box>
      </Box>
      <FabButton onClickAdd={() => setOpenCadastro(true)} />
      <DialogCadastroCargo
        mostrar={openCadastro}
        titulo="Cadastro Cargo"
        textoSim="Cadastrar"
        textoNao="Cancelar"
        callbackNao={() => setOpenCadastro(false)}
        callbackSim={(cargo) => createCargo(cargo)}
      />
    </>
  );
};

export default CadastroCargos;
