import React, { useEffect, useState } from "react";
import CampoTexto from "./CampoTexto";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import FiltroData from "./FiltroData";
import {
  atualizarCertificadoVistoria,
  buscarCertificadoVistoriaById,
} from "../chamadasApi/processoApi";
import { toast } from "react-toastify";

const StepVistoria = ({
  handleBack,
  handleNext,
  vistoriaId,
  processoId,
  setId,
}) => {
  const [
    data_inicio_preenchimento_inicial,
    setData_inicio_preenchimento_inicial,
  ] = useState(new Date());
  const [data_fim_preenchimento_inicial, setData_fim_preenchimento_inicial] =
    useState(new Date());
  const [transicao_preenchimento_inicial, setTransicao_preenchimento_inicial] =
    useState(new Date());
  const [
    responsavel_preenchimento_inicial,
    setResponsavel_preenchimento_inicial,
  ] = useState("");
  const [
    inicio_preenchimento_relatorio_honorario,
    setInicio_preenchimento_relatorio_honorario,
  ] = useState(new Date());
  const [
    fim_preenchimento_relatorio_honorario,
    setFim_preenchimento_relatorio_honorario,
  ] = useState(new Date());
  const [
    responsavel_preenchimento_relatorio_honorario,
    setResponsavel_preenchimento_relatorio_honorario,
  ] = useState("");
  const [inicio_analise_tecnica, setInicio_analise_tecnica] = useState(
    new Date()
  );
  const [fim_analise_tecnica, setFim_analise_tecnica] = useState(new Date());
  const [resultado_analise_tecnica, setResultado_analise_tecnica] =
    useState("");
  const [transicao_analise_tecnica, setTransicao_analise_tecnica] = useState(
    new Date()
  );
  const [responsavel_analise_tecnica, setResponsavel_analise_tecnica] =
    useState("");
  const [
    dias_obtido_tempo_total_processo,
    setDias_obtido_tempo_total_processo,
  ] = useState(0);
  const [embarcado_resultado, setEmbarcado_resultado] = useState(0);
  const [reparo_resultado, setReparo_resultado] = useState(0);
  const [reprocesso_resultado, setReprocesso_resultado] = useState(0);
  const [venda_salvados_resultado, setVenda_salvados_resultado] = useState(0);
  const [depreciacao_resultado, setDepreciacao_resultado] = useState(0);
  const [saque_resultado, setSaque_resultado] = useState(0);
  const [descarte_resultado, setDescarte_resultado] = useState(0);
  const [prejuizo_apurado_resultado, setPrejuizo_apurado_resultado] =
    useState(0);
  const [indenizacao_sugerida_resultado, setIndenizacao_sugerida_resultado] =
    useState(0);
  const [
    despesas_sos_custos_operacionais,
    setDespesas_sos_custos_operacionais,
  ] = useState(0);
  const [honorario_operacionais, setHonorario_operacionais] = useState(0);
  const [
    despesas_vistoria_custos_operacionais,
    setDespesas_vistoria_custos_operacionais,
  ] = useState(0);
  const [
    valor_embarque_procedimento_salvados,
    setValor_embarque_procedimento_salvados,
  ] = useState(0);
  const [
    estimativa_venda_procedimento_salvados,
    setEstimativa_venda_procedimento_salvados,
  ] = useState(0);
  const [
    venda_efetiva_procedimento_salvados,
    setVenda_efetiva_procedimento_salvados,
  ] = useState(false);
  const [
    comissao_avaria_procedimento_salvados,
    setComissao_avaria_procedimento_salvados,
  ] = useState(false);
  const [
    seguradora_procedimento_salvados,
    setSeguradora_procedimento_salvados,
  ] = useState(false);
  const [embarcado_resultado_salvados, setEmbarcado_resultado_salvados] =
    useState(0);
  const [
    prejuizo_apurado_resultado_salvados,
    setPrejuizo_apurado_resultado_salvados,
  ] = useState(0);
  const [franquia_pos_resultado_salvados, setFranquia_pos_resultado_salvados] =
    useState(0);
  const [
    indenizacao_analise_resultado_salvados,
    setIndenizacao_analise_resultado_salvados,
  ] = useState(false);

  const [
    tempo_inercia_preenchimento_inicial,
    setTempo_inercia_preenchimento_inicial,
  ] = useState("");
  const [tempo_preenchimento_inicial, setTempo_preenchimento_inicial] =
    useState("");
  const [
    tempo_preenchimento_relatorio_honorario,
    setTempo_preenchimento_relatorio_honorario,
  ] = useState("");
  const [tempo_inercia_analise_tecnica, setTempo_inercia_analise_tecnica] =
    useState("");
  const [tempo_analise_tecnica, setTempo_analise_tecnica] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    if (vistoriaId && vistoriaId >= 0) {
      buscaCertificadoVistoria(vistoriaId);
    }
  }, [vistoriaId]);

  const buscaCertificadoVistoria = (id) => {
    setCarregando(true);
    buscarCertificadoVistoriaById(id)
      .then((dados) => {
        setData_inicio_preenchimento_inicial(
          dados.data_inicio_preenchimento_inicial
        );
        setTempo_inercia_preenchimento_inicial(
          dados.tempo_inercia_preenchimento_inicial
        );
        setData_fim_preenchimento_inicial(dados.data_fim_preenchimento_inicial);
        setTempo_preenchimento_inicial(dados.tempo_preenchimento_inicial);
        setTransicao_preenchimento_inicial(
          dados.transicao_preenchimento_inicial
        );
        setResponsavel_preenchimento_inicial(
          dados.responsavel_preenchimento_inicial
        );
        setInicio_preenchimento_relatorio_honorario(
          dados.inicio_preenchimento_relatorio_honorario
        );
        setFim_preenchimento_relatorio_honorario(
          dados.fim_preenchimento_relatorio_honorario
        );
        setTempo_preenchimento_relatorio_honorario(
          dados.tempo_preenchimento_relatorio_honorario
        );
        setResponsavel_preenchimento_relatorio_honorario(
          dados.responsavel_preenchimento_relatorio_honorario
        );
        setInicio_analise_tecnica(dados.inicio_analise_tecnica);
        setTempo_inercia_analise_tecnica(dados.tempo_inercia_analise_tecnica);
        setFim_analise_tecnica(dados.fim_analise_tecnica);
        setTempo_analise_tecnica(dados.tempo_analise_tecnica);
        setResultado_analise_tecnica(dados.resultado_analise_tecnica);
        setTransicao_analise_tecnica(dados.transicao_analise_tecnica);
        setResponsavel_analise_tecnica(dados.responsavel_analise_tecnica);
        setDias_obtido_tempo_total_processo(
          dados.dias_obtido_tempo_total_processo
        );
        setEmbarcado_resultado(dados.embarcado_resultado);
        setReparo_resultado(dados.reparo_resultado);
        setReprocesso_resultado(dados.reprocesso_resultado);
        setVenda_salvados_resultado(dados.venda_salvados_resultado);
        setDepreciacao_resultado(dados.depreciacao_resultado);
        setSaque_resultado(dados.saque_resultado);
        setDescarte_resultado(dados.descarte_resultado);
        setPrejuizo_apurado_resultado(dados.prejuizo_apurado_resultado);
        setIndenizacao_sugerida_resultado(dados.indenizacao_sugerida_resultado);
        setDespesas_sos_custos_operacionais(
          dados.despesas_sos_custos_operacionais
        );
        setHonorario_operacionais(dados.honorario_operacionais);
        setDespesas_vistoria_custos_operacionais(
          dados.despesas_vistoria_custos_operacionais
        );
        setValor_embarque_procedimento_salvados(
          dados.valor_embarque_procedimento_salvados
        );
        setEstimativa_venda_procedimento_salvados(
          dados.estimativa_venda_procedimento_salvados
        );
        setVenda_efetiva_procedimento_salvados(
          dados.venda_efetiva_procedimento_salvados
        );
        setComissao_avaria_procedimento_salvados(
          dados.comissao_avaria_procedimento_salvados
        );
        setSeguradora_procedimento_salvados(
          dados.seguradora_procedimento_salvados
        );
        setEmbarcado_resultado_salvados(dados.embarcado_resultado_salvados);
        setPrejuizo_apurado_resultado_salvados(
          dados.prejuizo_apurado_resultado_salvados
        );
        setFranquia_pos_resultado_salvados(
          dados.franquia_pos_resultado_salvados
        );
        setIndenizacao_analise_resultado_salvados(
          dados.indenizacao_analise_resultado_salvados
        );
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

  const atualizaCertificadoVistoria = () => {
    setAtualizando(true);
    atualizarCertificadoVistoria(processoId, {
      data_inicio_preenchimento_inicial,
      tempo_inercia_preenchimento_inicial,
      data_fim_preenchimento_inicial,
      tempo_preenchimento_inicial,
      transicao_preenchimento_inicial,
      responsavel_preenchimento_inicial,
      inicio_preenchimento_relatorio_honorario,
      fim_preenchimento_relatorio_honorario,
      tempo_preenchimento_relatorio_honorario,
      responsavel_preenchimento_relatorio_honorario,
      inicio_analise_tecnica,
      tempo_inercia_analise_tecnica,
      fim_analise_tecnica,
      tempo_analise_tecnica,
      resultado_analise_tecnica,
      transicao_analise_tecnica,
      responsavel_analise_tecnica,
      dias_obtido_tempo_total_processo,
      embarcado_resultado,
      reparo_resultado,
      reprocesso_resultado,
      venda_salvados_resultado,
      depreciacao_resultado,
      saque_resultado,
      descarte_resultado,
      prejuizo_apurado_resultado,
      indenizacao_sugerida_resultado,
      despesas_sos_custos_operacionais,
      honorario_operacionais,
      despesas_vistoria_custos_operacionais,
      valor_embarque_procedimento_salvados,
      estimativa_venda_procedimento_salvados,
      venda_efetiva_procedimento_salvados,
      comissao_avaria_procedimento_salvados,
      seguradora_procedimento_salvados,
      embarcado_resultado_salvados,
      prejuizo_apurado_resultado_salvados,
      franquia_pos_resultado_salvados,
      indenizacao_analise_resultado_salvados,
    })
      .then((dados) => {
        toast.success("Certificado de vistoria atualizado!");
        setAtualizando(false);
        setId(dados.data.id ?? -1);
        handleNext();
      })
      .catch((error) => {
        toast.error("Erro ao atualizar certificado de vistoria");
        console.log(error);
        setAtualizando(false);
      });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case "venda_efetiva_procedimento_salvados":
        setVenda_efetiva_procedimento_salvados(checked);
        break;
      case "comissao_avaria_procedimento_salvados":
        setComissao_avaria_procedimento_salvados(checked);
        break;
      case "seguradora_procedimento_salvados":
        setSeguradora_procedimento_salvados(checked);
        break;
      default:
        console.log("Nenhum selecionado");
        break;
    }
  };

  if (carregando) {
    return <CircularProgress />;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "45px",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>
          PREENCHIMENTO INICIAL
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <div style={{ width: "33%" }}>
          <FiltroData
            dataInicial={data_inicio_preenchimento_inicial}
            onSelectDataInicial={(date) =>
              setData_inicio_preenchimento_inicial(date)
            }
            hora={true}
            dialogData={true}
            titulo="Início na etapa"
          />
        </div>
        <CampoTexto
          style={{ width: "33%" }}
          name="tempo_inercia_preenchimento_inicial"
          id="tempo_inercia_preenchimento_inicial"
          label="Tempo de inércia"
          tipo="text"
          value={tempo_inercia_preenchimento_inicial}
          onChange={(e) =>
            setTempo_inercia_preenchimento_inicial(e.target.value)
          }
        />
        <div style={{ width: "34%" }}>
          <FiltroData
            dataInicial={data_fim_preenchimento_inicial}
            onSelectDataInicial={(date) =>
              setData_fim_preenchimento_inicial(date)
            }
            hora={true}
            dialogData={true}
            titulo="Fim"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <CampoTexto
          style={{ width: "33%" }}
          name="tempo_preenchimento_inicial"
          id="tempo_preenchimento_inicial"
          label="Tempo de preenchimento"
          tipo="text"
          value={tempo_preenchimento_inicial}
          onChange={(e) => setTempo_preenchimento_inicial(e.target.value)}
        />
        <div style={{ width: "33%" }}>
          <FiltroData
            dataInicial={transicao_preenchimento_inicial}
            onSelectDataInicial={(date) =>
              setTransicao_preenchimento_inicial(date)
            }
            hora={true}
            dialogData={true}
            titulo="Transição"
          />
        </div>
        <CampoTexto
          style={{ width: "34%" }}
          name="responsavel_preenchimento_inicial"
          id="responsavel_preenchimento_inicial"
          label="Responsável"
          tipo="text"
          value={responsavel_preenchimento_inicial}
          onChange={(e) => setResponsavel_preenchimento_inicial(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "45px",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>
          PREENCHIMENTO RELATÓRIO DE HONORÁRIOS E DESPESAS
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <div style={{ width: "34%" }}>
          <FiltroData
            dataInicial={inicio_preenchimento_relatorio_honorario}
            onSelectDataInicial={(date) =>
              setInicio_preenchimento_relatorio_honorario(date)
            }
            hora={true}
            dialogData={true}
            titulo="Início"
          />
        </div>
        <div style={{ width: "34%" }}>
          <FiltroData
            dataInicial={fim_preenchimento_relatorio_honorario}
            onSelectDataInicial={(date) =>
              setFim_preenchimento_relatorio_honorario(date)
            }
            hora={true}
            dialogData={true}
            titulo="Fim"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <CampoTexto
          style={{ width: "34%" }}
          name="tempo_preenchimento_relatorio_honorario"
          id="tempo_preenchimento_relatorio_honorario"
          label="Tempo de preenchimento"
          tipo="text"
          value={tempo_preenchimento_relatorio_honorario}
          onChange={(e) =>
            setTempo_preenchimento_relatorio_honorario(e.target.value)
          }
        />
        <CampoTexto
          style={{ width: "34%" }}
          name="responsavel_preenchimento_relatorio_honorario"
          id="responsavel_preenchimento_relatorio_honorario"
          label="Responsável"
          tipo="text"
          value={responsavel_preenchimento_relatorio_honorario}
          onChange={(e) =>
            setResponsavel_preenchimento_relatorio_honorario(e.target.value)
          }
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "45px",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>
          ANÁLISE TÉCNICA
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <div style={{ width: "33%" }}>
          <FiltroData
            dataInicial={inicio_analise_tecnica}
            onSelectDataInicial={(date) => setInicio_analise_tecnica(date)}
            hora={true}
            dialogData={true}
            titulo="Início"
          />
        </div>
        <CampoTexto
          style={{ width: "33%" }}
          name="tempo_inercia_analise_tecnica"
          id="tempo_inercia_analise_tecnica"
          label="Tempo de inércia"
          tipo="text"
          value={tempo_inercia_analise_tecnica}
          onChange={(e) => setTempo_inercia_analise_tecnica(e.target.value)}
        />
        <div style={{ width: "34%" }}>
          <FiltroData
            dataInicial={fim_analise_tecnica}
            onSelectDataInicial={(date) => setFim_analise_tecnica(date)}
            hora={true}
            dialogData={true}
            titulo="Fim"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <CampoTexto
          style={{ width: "33%" }}
          name="tempo_analise_tecnica"
          id="tempo_analise_tecnica"
          label="Tempo de análise"
          tipo="text"
          value={tempo_analise_tecnica}
          onChange={(e) => setTempo_analise_tecnica(e.target.value)}
        />
        <CampoTexto
          style={{ width: "33%" }}
          name="resultado_analise_tecnica"
          id="resultado_analise_tecnica"
          label="Resultado da análise técnica"
          tipo="text"
          value={resultado_analise_tecnica}
          onChange={(e) => setResultado_analise_tecnica(e.target.value)}
        />
        <div style={{ width: "34%" }}>
          <FiltroData
            dataInicial={transicao_analise_tecnica}
            onSelectDataInicial={(date) => setTransicao_analise_tecnica(date)}
            hora={true}
            dialogData={true}
            titulo="Transição"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <CampoTexto
          style={{ width: "34%" }}
          name="responsavel_analise_tecnica"
          id="responsavel_analise_tecnica"
          label="Responsável"
          tipo="text"
          value={responsavel_analise_tecnica}
          onChange={(e) => setResponsavel_analise_tecnica(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "45px",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>
          TEMPO TOTAL DO PROCESSO
        </span>
        <span style={{ fontSize: 12, marginBottom: "8px" }}>
          (dias – base acionam. da Reguladora e envio do final a Cia.)
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <CampoTexto
          style={{ width: "34%" }}
          name="dias_obtido_tempo_total_processo"
          id="dias_obtido_tempo_total_processo"
          label="Tempo total do processo em dias"
          tipo="number"
          value={dias_obtido_tempo_total_processo}
          onChange={(e) => setDias_obtido_tempo_total_processo(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "45px",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>RESULTADO</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <CampoTexto
          style={{ width: "24.5%" }}
          name="embarcado_resultado"
          id="embarcado_resultado"
          label="Embarcado"
          tipo="number"
          percent={true}
          value={embarcado_resultado}
          onChange={(e) => setEmbarcado_resultado(e.target.value)}
        />
        <CampoTexto
          style={{ width: "24.5%" }}
          name="reparo_resultado"
          id="reparo_resultado"
          label="Reparo"
          tipo="number"
          percent={true}
          value={reparo_resultado}
          onChange={(e) => setReparo_resultado(e.target.value)}
        />
        <CampoTexto
          style={{ width: "24.5%" }}
          name="reprocesso_resultado"
          id="reprocesso_resultado"
          label="Reprocesso"
          tipo="number"
          percent={true}
          value={reprocesso_resultado}
          onChange={(e) => setReprocesso_resultado(e.target.value)}
        />
        <CampoTexto
          style={{ width: "24.5%" }}
          name="venda_salvados_resultado"
          id="venda_salvados_resultado"
          label="Venda dos Salvados"
          tipo="number"
          percent={true}
          value={venda_salvados_resultado}
          onChange={(e) => setVenda_salvados_resultado(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <CampoTexto
          style={{ width: "24.5%" }}
          name="depreciacao_resultado"
          id="depreciacao_resultado"
          label="Depreciação"
          tipo="number"
          percent={true}
          value={depreciacao_resultado}
          onChange={(e) => setDepreciacao_resultado(e.target.value)}
        />
        <CampoTexto
          style={{ width: "24.5%" }}
          name="saque_resultado"
          id="saque_resultado"
          label="Saque"
          tipo="number"
          percent={true}
          value={saque_resultado}
          onChange={(e) => setSaque_resultado(e.target.value)}
        />
        <CampoTexto
          style={{ width: "24.5%" }}
          name="descarte_resultado"
          id="descarte_resultado"
          label="Descarte"
          tipo="number"
          percent={true}
          value={descarte_resultado}
          onChange={(e) => setDescarte_resultado(e.target.value)}
        />
        <CampoTexto
          style={{ width: "24.5%" }}
          name="prejuizo_apurado_resultado"
          id="prejuizo_apurado_resultado"
          label="Prejuízo apurado"
          tipo="number"
          percent={true}
          value={prejuizo_apurado_resultado}
          onChange={(e) => setPrejuizo_apurado_resultado(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <CampoTexto
          style={{ width: "24.5%" }}
          name="indenizacao_sugerida_resultado"
          id="indenizacao_sugerida_resultado"
          label="Indenização sugerida"
          tipo="number"
          percent={true}
          value={indenizacao_sugerida_resultado}
          onChange={(e) => setIndenizacao_sugerida_resultado(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "45px",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>
          CUSTOS OPERACIONAIS
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <CampoTexto
          style={{ width: "24.5%" }}
          name="despesas_dos_custos_operacionais"
          id="despesas_dos_custos_operacionais"
          label="Despesas SOS"
          tipo="number"
          percent={true}
          value={despesas_sos_custos_operacionais}
          onChange={(e) => setDespesas_sos_custos_operacionais(e.target.value)}
        />
        <CampoTexto
          style={{ width: "24.5%" }}
          name="honorario_operacionais"
          id="honorario_operacionais"
          label="Honorários"
          tipo="number"
          percent={true}
          value={honorario_operacionais}
          onChange={(e) => setHonorario_operacionais(e.target.value)}
        />
        <CampoTexto
          style={{ width: "24.5%" }}
          name="despesas_vistoria_custos_operacionais"
          id="despesas_vistoria_custos_operacionais"
          label="Despesas da Vistoria"
          tipo="number"
          percent={true}
          value={despesas_vistoria_custos_operacionais}
          onChange={(e) =>
            setDespesas_vistoria_custos_operacionais(e.target.value)
          }
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "45px",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: "bold" }}>
          PROCEDIMENTOS COM SALVADOS
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <CampoTexto
          style={{ width: "33%" }}
          name="valor_embarque_procedimento_salvados"
          id="valor_embarque_procedimento_salvados"
          label="Valor embarque"
          tipo="number"
          percent={true}
          value={valor_embarque_procedimento_salvados}
          onChange={(e) =>
            setValor_embarque_procedimento_salvados(e.target.value)
          }
        />
        <CampoTexto
          style={{ width: "33%" }}
          name="estimativa_venda_procedimento_salvados"
          id="estimativa_venda_procedimento_salvados"
          label="Estimativa de venda"
          tipo="number"
          percent={true}
          value={estimativa_venda_procedimento_salvados}
          onChange={(e) =>
            setEstimativa_venda_procedimento_salvados(e.target.value)
          }
        />
        <CampoTexto
          style={{ width: "34%" }}
          name="embarcado_resultado_salvados"
          id="embarcado_resultado_salvados"
          label="Embarcado resultados salvados"
          tipo="number"
          percent={true}
          value={embarcado_resultado_salvados}
          onChange={(e) => setEmbarcado_resultado_salvados(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={venda_efetiva_procedimento_salvados}
                onChange={handleCheckboxChange}
                name="venda_efetiva_procedimento_salvados"
              />
            }
            label="Venda efetiva de procedimento salvados"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={comissao_avaria_procedimento_salvados}
                onChange={handleCheckboxChange}
                name="comissao_avaria_procedimento_salvados"
              />
            }
            label="Comissão de avaria de procedimento salvados"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={seguradora_procedimento_salvados}
                onChange={handleCheckboxChange}
                name="seguradora_procedimento_salvados"
              />
            }
            label="Seguradora procedimentos salvados"
          />
        </FormGroup>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "65px",
          gap: "8px",
        }}
      >
        <CampoTexto
          style={{ width: "33%" }}
          name="prejuizo_apurado_resultado_salvados"
          id="prejuizo_apurado_resultado_salvados"
          label="Prejuízo apurado resultado salvados"
          tipo="number"
          percent={true}
          value={prejuizo_apurado_resultado_salvados}
          onChange={(e) =>
            setPrejuizo_apurado_resultado_salvados(e.target.value)
          }
        />
        <CampoTexto
          style={{ width: "33%" }}
          name="franquia_pos_resultado_salvados"
          id="franquia_pos_resultado_salvados"
          label="Franquia pós resultados salvados"
          tipo="number"
          percent={true}
          value={franquia_pos_resultado_salvados}
          onChange={(e) => setFranquia_pos_resultado_salvados(e.target.value)}
        />
        <CampoTexto
          style={{ width: "34%" }}
          name="indenizacao_analise_resultado_salvados"
          id="indenizacao_analise_resultado_salvados"
          label="Indenização análise resultado salvados"
          tipo="number"
          percent={true}
          value={indenizacao_analise_resultado_salvados}
          onChange={(e) =>
            setIndenizacao_analise_resultado_salvados(e.target.value)
          }
        />
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
            atualizaCertificadoVistoria();
          }}
          variant="contained"
          color="primary"
        >
          {atualizando ? <CircularProgress /> : "Próximo"}
        </Button>
      </div>
    </div>
  );
};

export default StepVistoria;
