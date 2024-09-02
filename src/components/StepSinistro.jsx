import React, { useEffect, useState } from "react";
import CampoTexto from "./CampoTexto";
import { Button, CircularProgress } from "@mui/material";
import FiltroData from "./FiltroData";
import UFSelect from "./UFSelect";
import {
  atualizarSinistro,
  buscarSinistroById,
} from "../chamadasApi/processoApi";
import { toast } from "react-toastify";
import getEstadoByUF from "../util/obtemEstado";

const StepSinistro = ({
  handleBack,
  handleNext,
  sinistroId,
  processoId,
  setId,
}) => {
  const [data, setData] = useState(new Date());
  const [cidade, setCidade] = useState("");
  const [tipoMercadoria, setTipoMercadoria] = useState("");
  const [caracterizacaoOcorrencia, setCaracterizacaoOcorrencia] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [uf, setUf] = useState({
    estado: "",
    uf: "",
  });

  useEffect(() => {
    if (sinistroId && sinistroId >= 0) {
      buscarSinistro(sinistroId);
    }
  }, [sinistroId]);

  const buscarSinistro = (id) => {
    setCarregando(true);
    buscarSinistroById(id)
      .then((dados) => {
        setCidade(dados.cidade);
        setTipoMercadoria(dados.tipo_mercadoria);
        setCaracterizacaoOcorrencia(dados.caracterizacao_ocorrencia);
        setUf({
          estado: getEstadoByUF(dados.uf),
          uf: dados.uf,
        });
        setData(new Date(dados.data_ocorrencia));
        setCarregando(false);
      })
      .catch((error) => {
        toast.error(
          `Erro ao buscar informações do atendimento: ${error.toString()}`,
          {
            theme: "colored",
          }
        );
        setCarregando(false);
      });
  };

  const atualizaSinistro = () => {
    setAtualizando(true);
    atualizarSinistro(processoId, {
      data_ocorrencia: data,
      cidade,
      estado: uf,
      tipo_mercadoria: tipoMercadoria,
      caracterizacao_ocorrencia: caracterizacaoOcorrencia,
    })
      .then((dados) => {
        toast.success("Sinistro atualizado!");
        setAtualizando(false);
        setId(dados.data.id ?? -1);
        handleNext();
      })
      .catch((error) => {
        toast.error("Erro ao atualizar sinistro");
        console.log(error);
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
            style={{ width: "44.35%", marginRight: "5px" }}
            name="cidade"
            id="cidade"
            label="Cidade"
            tipo="text"
            required={true}
            value={cidade}
            focusnext="UF"
            onChange={(e) => setCidade(e.target.value)}
          />
          <UFSelect
            largura="10%"
            label="UF"
            value={uf.estado}
            onSelected={(e) => {
              setUf(e);
            }}
          />
          <CampoTexto
            style={{ width: "44.35%", marginLeft: "5px" }}
            name="tipoMercadoria"
            id="tipoMercadoria"
            label="Tipo de Mercadoria"
            tipo="text"
            required={true}
            value={tipoMercadoria}
            focusnext="ramo"
            onChange={(e) => setTipoMercadoria(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "65px",
            alignItems: "center",
          }}
        >
          <CampoTexto
            style={{ width: "70%", marginRight: "5px" }}
            name="caracterizacaoOcorrencia"
            id="caracterizacaoOcorrencia"
            label="Caracterização de Ocorrência"
            tipo="text"
            required={true}
            value={caracterizacaoOcorrencia}
            focusnext="UF"
            onChange={(e) => setCaracterizacaoOcorrencia(e.target.value)}
          />
          <div style={{ width: "30%", marginTop: "9px" }}>
            <FiltroData
              dataInicial={data}
              onSelectDataInicial={(date) => setData(date)}
              dialogData={true}
              titulo="Data ocorrência"
            />
          </div>
        </div>
      </div>
      <div>
        <Button
          onClick={handleBack}
          variant="contained"
          color="secondary"
          style={{ marginRight: 8 }}
        >
          Voltar
        </Button>
        <Button
          onClick={() => {
            atualizaSinistro();
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

export default StepSinistro;
