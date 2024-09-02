import React, { useEffect, useState } from "react";
import CampoTexto from "./CampoTexto";
import { Button, CircularProgress } from "@mui/material";
import {
  atualizarIdentificacao,
  cadastrarIdentificacao,
} from "../chamadasApi/processoApi";
import { toast } from "react-toastify";

const StepIdentificação = ({ handleNext, setId, processo, carregando }) => {
  const [corretora, setCorretora] = useState("");
  const [seguradora, setSeguradora] = useState("");
  const [segurado, setSegurado] = useState("");
  const [ramo, setRamo] = useState("");
  const [analista, setAnalista] = useState("");
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    if (processo) {
      setCorretora(processo.corretora ?? "");
      setSeguradora(processo.seguradora ?? "");
      setSegurado(processo.segurado ?? "");
      setRamo(processo.ramo ?? "");
      setAnalista(processo.analista ?? "");
    }
  }, [processo]);

  const cadastraProcesso = () => {
    setAtualizando(true);
    cadastrarIdentificacao({
      corretora,
      seguradora,
      segurado,
      ramo,
      analista,
    })
      .then((dados) => {
        toast.success("Identificação do processo cadastrada!");
        setAtualizando(false);
        setId(dados.data.id ?? -1);
        handleNext();
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar processo");
        setAtualizando(false);
      });
  };

  const atualizaProcesso = () => {
    setAtualizando(true);
    atualizarIdentificacao(processo.id, {
      corretora,
      seguradora,
      segurado,
      ramo,
      analista,
    })
      .then((dados) => {
        toast.success("Identificação do processo atualizada!");
        setAtualizando(false);
        handleNext();
      })
      .catch((error) => {
        toast.error("Erro ao atualizar processo");
        setAtualizando(false);
      });
  };

  if (carregando) {
    return <CircularProgress />;
  }

  return (
    <>
      <div style={{ height: "60vh" }}>
        <div style={{ width: "100%", height: "65px" }}>
          <CampoTexto
            style={{ width: "32.9%", marginRight: "5px" }}
            name="corretora"
            id="corretora"
            label="Corretora"
            tipo="text"
            required={true}
            value={corretora}
            focusnext="seguradora"
            onChange={(e) => setCorretora(e.target.value)}
          />
          <CampoTexto
            style={{ width: "32.9%", marginRight: "5px" }}
            name="seguradora"
            id="seguradora"
            label="Seguradora"
            tipo="text"
            required={true}
            value={seguradora}
            focusnext="segurado"
            onChange={(e) => setSeguradora(e.target.value)}
          />
          <CampoTexto
            style={{ width: "32.9%" }}
            name="segurado"
            id="segurado"
            label="Segurado"
            tipo="text"
            required={true}
            value={segurado}
            focusnext="ramo"
            onChange={(e) => setSegurado(e.target.value)}
          />
        </div>
        <div style={{ width: "100%", marginBottom: "8px" }}>
          <CampoTexto
            style={{ width: "49.7%", marginRight: "5px" }}
            name="ramo"
            id="ramo"
            label="Ramo"
            tipo="text"
            required={true}
            value={ramo}
            focusnext="analista"
            onChange={(e) => setRamo(e.target.value)}
          />
          <CampoTexto
            style={{ width: "49.7%" }}
            name="analista"
            id="analista"
            label="Analista"
            tipo="text"
            required={true}
            value={analista}
            onChange={(e) => setAnalista(e.target.value)}
          />
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Button
          onClick={() => {
            if (processo) {
              console.log("Atualizando processo");
              atualizaProcesso();
            } else {
              cadastraProcesso();
              console.log("Criando processo");
            }
            // logica para cadastrar o step 1
            //cadastrarIdentificacao()
          }}
          variant="contained"
          color="primary"
        >
          {atualizando ? <CircularProgress /> : "Próximo"}
        </Button>
      </div>
    </>
  );
};

export default StepIdentificação;
