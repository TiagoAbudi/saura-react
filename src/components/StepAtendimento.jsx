import React, { useEffect, useState } from "react";
import CampoTexto from "./CampoTexto";
import { Button, CircularProgress } from "@mui/material";
import FiltroData from "./FiltroData";
import CampoSelect from "./CampoSelect";
import ListaAddVistoria from "./ListaAddVistoria";
import {
  atualizarAtendimento,
  buscarAtendimentoById,
} from "../chamadasApi/processoApi";
import { toast } from "react-toastify";

const StepAtendimento = ({
  handleBack,
  handleNext,
  atendimentoId,
  processoId,
  setId,
}) => {
  const [vistorias, setVistorias] = useState([]);
  const [vistoriasSelecionadas, setVistoriasSelecionadas] = useState([]);
  const [dataComunicacao, setDataComunicacao] = useState(new Date());
  const [dataAcionamento, setDataAcionamento] = useState(new Date());
  const [dataLancamento, setDataLancamento] = useState(new Date());
  const [comunicacaoSelecionado, setComunicacaoSelecionado] = useState("0");
  const [acionamentoSelecionado, setAcionamentoSelecionado] = useState("0");
  const [totalSelecionado, setTotalSelecionado] = useState("0");
  const [terminoPlanejamento, setTerminoPlanejamento] = useState(new Date());
  const [previsaoInicioPlanejamento, setPrevisaoInicioPlanejamento] = useState(
    new Date()
  );
  const [inicioExecucaoPlanejamento, setInicioExecucaoPlanejamento] = useState(
    new Date()
  );
  const [conclusaoExecucaoPlanejamento, setConclusaoExecucaoPlanejamento] =
    useState(new Date());
  const [terminoAtendimento, setTerminoAtendimento] = useState(new Date());
  const [inicioPreenchimentoInicial, setInicioPreenchimentoInicial] = useState(
    new Date()
  );
  const [tempoInercia, setTempoInercia] = useState("");
  const [fimPreenchimentoInicial, setFimPreenchimentoInicial] = useState(
    new Date()
  );
  const [tempoPreenchimento, setTempoPreenchimento] = useState("");
  const [transicao, setTransicao] = useState(new Date());
  const [responsavel, setResponsavel] = useState("");
  const [inicioAnaliseTecnica, setInicioAnaliseTecnica] = useState(new Date());
  const [tempoInerciaAnaliseTecnica, setTempoInerciaAnaliseTecnica] =
    useState("");
  const [fimAnaliseTecnica, setFimAnaliseTecnica] = useState(new Date());
  const [tempoAnaliseTecnica, setTempoAnaliseTecnica] = useState("");
  const [resultado, setResultado] = useState("");
  const [responsavelAnaliseTecnica, setResponsavelAnaliseTecnica] =
    useState("");
  const [terminoEtapa01, setTerminoEtapa01] = useState("");
  const [munkDespesassos, setMunkDespesassos] = useState("");
  const [repaletizacaoDespesassos, setRepaletizacaoDespesassos] = useState("");
  const [vigilanciaArmadasos, setVigilanciaArmadasos] = useState("");
  const [guindastesos, setGuindastesos] = useState("");
  const [chapassos, setChapassos] = useState("");
  const [empilhadeirasos, setEmpilhadeirasos] = useState("");
  const [fretesos, setFretesos] = useState("");
  const [galpaosos, setGalpaosos] = useState("");
  const [episos, setEpisos] = useState("");
  const [totalGeralCustosOperacionais, setTotalGeralCustosOperacionais] =
    useState("");
  const [carregando, setCarregando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  const FrequenciaComunicacao = [
    { id: 5, valor: 5, descricao: "5 min" },
    { id: 10, valor: 10, descricao: "10 min" },
    { id: 15, valor: 15, descricao: "15 min" },
    { id: 20, valor: 20, descricao: "20 min" },
    { id: 30, valor: 30, descricao: "30 min" },
    { id: 45, valor: 45, descricao: "45 min" },
    { id: 60, valor: 60, descricao: "01 hr" },
    { id: 61, valor: 61, descricao: "> 01 hr" },
  ];

  useEffect(() => {
    if (atendimentoId && atendimentoId >= 0) {
      buscarAtendimento(atendimentoId);
    }
  }, [atendimentoId]);

  const buscarAtendimento = (id) => {
    setCarregando(true);
    buscarAtendimentoById(id)
      .then((dados) => {
        setDataComunicacao(dados.data_comunicacao);
        setComunicacaoSelecionado(dados.tempo_comunicacao);
        setDataAcionamento(dados.data_acionamento);
        setAcionamentoSelecionado(dados.tempo_acionamento);
        setTotalSelecionado(dados.tempo_total);
        setDataLancamento(dados.data_lancamento);
        setTerminoPlanejamento(dados.termino_planejamento);
        setPrevisaoInicioPlanejamento(dados.previsao_inicio_planejamento);
        setInicioExecucaoPlanejamento(dados.inicio_execucao_planejamento);
        setConclusaoExecucaoPlanejamento(dados.conclusao_execucao_planejamento);
        setTerminoAtendimento(dados.termino_atendimento);
        setInicioPreenchimentoInicial(dados.inicio_preenchimento_inicial);
        setTempoInercia(dados.tempo_inercia);
        setFimPreenchimentoInicial(dados.fim_preenchimento_inicial);
        setTempoPreenchimento(dados.tempo_preenchimento);
        setTransicao(dados.transicao);
        setResponsavel(dados.responsavel);
        setInicioAnaliseTecnica(dados.inicio_analise_tecnica);
        setTempoInerciaAnaliseTecnica(dados.tempo_inercia_analise_tecnica);
        setFimAnaliseTecnica(dados.fim_analise_tecnica);
        setTempoAnaliseTecnica(dados.tempo_analise_tecnica);
        setResultado(dados.resultado);
        setResponsavelAnaliseTecnica(dados.responsavel_analise_tecnica);
        setTerminoEtapa01(dados.termino_etapa_01);
        setMunkDespesassos(dados.munk_despesas_sos);
        setRepaletizacaoDespesassos(dados.repaletizacao_despesas_sos);
        setVigilanciaArmadasos(dados.vigilancia_armada_sos);
        setGuindastesos(dados.guindaste_sos);
        setChapassos(dados.chapas_sos);
        setEmpilhadeirasos(dados.empilhadeira_sos);
        setFretesos(dados.frete_sos);
        setGalpaosos(dados.galpao_sos);
        setEpisos(dados.epi_sos);
        setTotalGeralCustosOperacionais(dados.total_geral_custos_operacionais);
        setVistoriasSelecionadas(dados.vistoria);
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

  const atualizaAtendimento = () => {
    setAtualizando(true);
    atualizarAtendimento(processoId, {
      data_comunicacao: dataComunicacao,
      tempo_comunicacao: comunicacaoSelecionado,
      data_acionamento: dataAcionamento,
      tempo_acionamento: acionamentoSelecionado,
      tempo_total: totalSelecionado,
      data_lancamento: dataLancamento,
      termino_planejamento: terminoPlanejamento,
      previsao_inicio_planejamento: previsaoInicioPlanejamento,
      inicio_execucao_planejamento: inicioExecucaoPlanejamento,
      conclusao_execucao_planejamento: conclusaoExecucaoPlanejamento,
      termino_atendimento: terminoAtendimento,
      inicio_preenchimento_inicial: inicioPreenchimentoInicial,
      tempo_inercia: tempoInercia,
      fim_preenchimento_inicial: fimPreenchimentoInicial,
      tempo_preenchimento: tempoPreenchimento,
      transicao: transicao,
      responsavel: responsavel,
      inicio_analise_tecnica: inicioAnaliseTecnica,
      tempo_inercia_analise_tecnica: tempoInerciaAnaliseTecnica,
      fim_analise_tecnica: fimAnaliseTecnica,
      tempo_analise_tecnica: tempoAnaliseTecnica,
      resultado: resultado,
      responsavel_analise_tecnica: responsavelAnaliseTecnica,
      termino_etapa_01: terminoEtapa01,
      munk_despesas_sos: parseInt(munkDespesassos),
      repaletizacao_despesas_sos: parseInt(repaletizacaoDespesassos),
      vigilancia_armada_sos: parseInt(vigilanciaArmadasos),
      guindaste_sos: parseInt(guindastesos),
      chapas_sos: parseInt(chapassos),
      empilhadeira_sos: parseInt(empilhadeirasos),
      frete_sos: parseInt(fretesos),
      galpao_sos: parseInt(galpaosos),
      epi_sos: parseInt(episos),
      total_geral_custos_operacionais: parseInt(totalGeralCustosOperacionais),
      vistorias: vistoriasSelecionadas,
    })
      .then((dados) => {
        console.log(dados);
        toast.success("Atendimento atualizado!");
        setAtualizando(false);
        setId(dados.data.id ?? -1);
        handleNext();
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message ?? error.toString();
        toast.error(`Erro ao atualizar atendimento: ${errorMessage}`);
        console.log(error);
        setAtualizando(false);
      });
  };

  const removerVistoria = (indice) => {
    const novasVistorias = [...vistoriasSelecionadas];
    novasVistorias.splice(indice, 1);
    setVistoriasSelecionadas(novasVistorias);
  };

  const addVistoria = (vistoria) => {
    const novasVistorias = [...vistoriasSelecionadas, vistoria];
    setVistoriasSelecionadas(novasVistorias);
  };

  const mostraLinha = (dado) => {
    return `${dado.descricao}`;
  };

  if (carregando) {
    return <CircularProgress />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "60vh" }}>
      <div style={{ flex: "1 0 auto" }}>
        <div>
          <FiltroData
            dataInicial={dataComunicacao}
            onSelectDataInicial={(date) => setDataComunicacao(date)}
            dialogData={true}
            titulo="Data Comunicação"
            largura="20%"
          />

          <CampoSelect
            largura="162px"
            margemDireita="5px"
            dados={FrequenciaComunicacao}
            label="Tempo Comunicação"
            onSelected={(dado) => setComunicacaoSelecionado(dado.valor)}
            mostraLinha={(dado) => mostraLinha(dado)}
            value={comunicacaoSelecionado}
          />

          <FiltroData
            dataInicial={dataAcionamento}
            onSelectDataInicial={(date) => setDataAcionamento(date)}
            dialogData={true}
            titulo="Data Acionamento"
            largura="19.8%"
          />

          <CampoSelect
            largura="165px"
            margemDireita="5px"
            dados={FrequenciaComunicacao}
            label="Tempo Acionamento"
            onSelected={(dado) => setAcionamentoSelecionado(dado.id)}
            mostraLinha={(dado) => mostraLinha(dado)}
            value={acionamentoSelecionado}
          />

          <FiltroData
            dataInicial={dataLancamento}
            onSelectDataInicial={(date) => setDataLancamento(date)}
            dialogData={true}
            titulo="Data Lançamento"
            largura="20%"
          />
        </div>

        <div>
          <CampoSelect
            largura="272px"
            margemDireita="5px"
            dados={FrequenciaComunicacao}
            label="Tempo Total"
            onSelected={(dado) => setTotalSelecionado(dado.id)}
            mostraLinha={(dado) => mostraLinha(dado)}
            value={totalSelecionado}
          />

          <FiltroData
            dataInicial={terminoPlanejamento}
            onSelectDataInicial={(date) => setTerminoPlanejamento(date)}
            dialogData={true}
            titulo="Término Planejamento"
            largura="26%"
          />

          <FiltroData
            dataInicial={previsaoInicioPlanejamento}
            onSelectDataInicial={(date) => setPrevisaoInicioPlanejamento(date)}
            dialogData={true}
            titulo="Previsão Início Planejamento"
            largura="21%"
          />

          <FiltroData
            dataInicial={inicioExecucaoPlanejamento}
            onSelectDataInicial={(date) => setInicioExecucaoPlanejamento(date)}
            dialogData={true}
            titulo="Inicio Execução Planejamento"
            largura="20%"
          />
        </div>

        <div>
          <FiltroData
            dataInicial={conclusaoExecucaoPlanejamento}
            onSelectDataInicial={(date) =>
              setConclusaoExecucaoPlanejamento(date)
            }
            dialogData={true}
            titulo="Conclusão Execução Planejamento"
            largura="24%"
          />

          <FiltroData
            dataInicial={terminoAtendimento}
            onSelectDataInicial={(date) => setTerminoAtendimento(date)}
            dialogData={true}
            titulo="Término Atendimento"
            largura="18%"
          />

          <FiltroData
            dataInicial={inicioPreenchimentoInicial}
            onSelectDataInicial={(date) => setInicioPreenchimentoInicial(date)}
            dialogData={true}
            titulo="Início Preenchimento Inicial"
            largura="21%"
          />

          <CampoTexto
            style={{ width: "15%", marginRight: "5px" }}
            name="tempoInercia"
            id="tempoInercia"
            label="Tempo Inércia"
            required={true}
            value={tempoInercia}
            focusnext="select-licenca"
            onChange={(e) => setTempoInercia(e.target.value)}
          />

          <FiltroData
            dataInicial={fimPreenchimentoInicial}
            onSelectDataInicial={(date) => setFimPreenchimentoInicial(date)}
            dialogData={true}
            titulo="Fim Preenchimento Inicial"
            largura="21%"
          />
        </div>

        <div>
          <CampoTexto
            style={{ width: "21%", marginRight: "5px" }}
            name="tempoPreenchimento"
            id="tempoPreenchimento"
            label="Tempo Preenchimento"
            required={true}
            value={tempoPreenchimento}
            focusnext="select-licenca"
            onChange={(e) => setTempoPreenchimento(e.target.value)}
          />

          <FiltroData
            dataInicial={transicao}
            onSelectDataInicial={(date) => setTransicao(date)}
            dialogData={true}
            titulo="Transição"
            largura="16%"
          />

          <CampoTexto
            style={{ width: "16%", marginRight: "5px" }}
            name="responsavel"
            id="responsavel"
            label="Responsável"
            required={true}
            value={responsavel}
            focusnext="select-licenca"
            onChange={(e) => setResponsavel(e.target.value)}
          />

          <FiltroData
            dataInicial={inicioAnaliseTecnica}
            onSelectDataInicial={(date) => setInicioAnaliseTecnica(date)}
            dialogData={true}
            titulo="Início Análise Técnica"
            largura="18%"
          />

          <CampoTexto
            style={{ width: "26.8%", marginRight: "5px" }}
            name="tempoInerciaAnaliseTecnica"
            id="tempoInerciaAnaliseTecnica"
            label="Tempo Inércia Análise Técnica"
            required={true}
            value={tempoInerciaAnaliseTecnica}
            focusnext="select-licenca"
            onChange={(e) => setTempoInerciaAnaliseTecnica(e.target.value)}
          />
        </div>

        <div>
          <FiltroData
            dataInicial={fimAnaliseTecnica}
            onSelectDataInicial={(date) => setFimAnaliseTecnica(date)}
            dialogData={true}
            titulo="Fim Análise Técnica"
            largura="18%"
          />

          <CampoTexto
            style={{ width: "22%", marginRight: "5px" }}
            name="tempoAnaliseTecnica"
            id="tempoAnaliseTecnica"
            label="Tempo Análise Técnica"
            required={true}
            value={tempoAnaliseTecnica}
            focusnext="select-licenca"
            onChange={(e) => setTempoAnaliseTecnica(e.target.value)}
          />

          <CampoTexto
            style={{ width: "13%", marginRight: "5px" }}
            name="resultado"
            id="resultado"
            label="Resultado"
            required={true}
            value={resultado}
            focusnext="select-licenca"
            onChange={(e) => setResultado(e.target.value)}
          />

          <CampoTexto
            style={{ width: "26%", marginRight: "5px" }}
            name="responsavelAnaliseTecnica"
            id="responsavelAnaliseTecnica"
            label="Responsável Análise Técnica"
            required={true}
            value={responsavelAnaliseTecnica}
            focusnext="select-licenca"
            onChange={(e) => setResponsavelAnaliseTecnica(e.target.value)}
          />

          <CampoTexto
            style={{ width: "18%", marginRight: "5px" }}
            name="terminoEtapa01"
            id="terminoEtapa01"
            label="Término Etapa 01"
            required={true}
            value={terminoEtapa01}
            focusnext="select-licenca"
            onChange={(e) => setTerminoEtapa01(e.target.value)}
          />
        </div>

        <div>
          <CampoTexto
            style={{ width: "20%", marginRight: "5px" }}
            name="munkDespesassos"
            id="munkDespesassos"
            label="Munk Despesas sos"
            required={true}
            value={munkDespesassos}
            focusnext="select-licenca"
            onChange={(e) => setMunkDespesassos(e.target.value)}
          />

          <CampoTexto
            style={{ width: "25%", marginRight: "5px" }}
            name="repaletizacaoDespesassos"
            id="repaletizacaoDespesassos"
            label="Repaletização Despesas sos"
            required={true}
            value={repaletizacaoDespesassos}
            focusnext="select-licenca"
            onChange={(e) => setRepaletizacaoDespesassos(e.target.value)}
          />

          <CampoTexto
            style={{ width: "21.5%", marginRight: "5px" }}
            name="vigilanciaArmadasos"
            id="vigilanciaArmadasos"
            label="Vigilância Armada sos"
            required={true}
            value={vigilanciaArmadasos}
            focusnext="select-licenca"
            onChange={(e) => setVigilanciaArmadasos(e.target.value)}
          />

          <CampoTexto
            style={{ width: "16%", marginRight: "5px" }}
            name="guindastesos"
            id="guindastesos"
            label="Guindaste sos"
            required={true}
            value={guindastesos}
            focusnext="select-licenca"
            onChange={(e) => setGuindastesos(e.target.value)}
          />

          <CampoTexto
            style={{ width: "14%", marginRight: "5px" }}
            name="chapassos"
            id="chapassos"
            label="Chapas sos"
            required={true}
            value={chapassos}
            focusnext="select-licenca"
            onChange={(e) => setChapassos(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <CampoTexto
            style={{ width: "20%", marginRight: "5px" }}
            name="empilhadeirasos"
            id="empilhadeirasos"
            label="Empilhadeira sos"
            required={true}
            value={empilhadeirasos}
            focusnext="select-licenca"
            onChange={(e) => setEmpilhadeirasos(e.target.value)}
          />

          <CampoTexto
            style={{ width: "15%", marginRight: "5px" }}
            name="fretesos"
            id="fretesos"
            label="Frete sos"
            required={true}
            value={fretesos}
            focusnext="select-licenca"
            onChange={(e) => setFretesos(e.target.value)}
          />

          <CampoTexto
            style={{ width: "15%", marginRight: "5px" }}
            name="galpaosos"
            id="galpaosos"
            label="Galpão sos"
            required={true}
            value={galpaosos}
            focusnext="select-licenca"
            onChange={(e) => setGalpaosos(e.target.value)}
          />

          <CampoTexto
            style={{ width: "16.5%", marginRight: "5px" }}
            name="episos"
            id="episos"
            label="EPI sos"
            required={true}
            value={episos}
            focusnext="select-licenca"
            onChange={(e) => setEpisos(e.target.value)}
          />

          <CampoTexto
            style={{ width: "30%", marginRight: "5px" }}
            name="totalGeralCustosOperacionais"
            id="totalGeralCustosOperacionais"
            label="Total Geral Custos Operacionais"
            required={true}
            value={totalGeralCustosOperacionais}
            focusnext="select-licenca"
            onChange={(e) => setTotalGeralCustosOperacionais(e.target.value)}
          />
        </div>

        <div>
          <ListaAddVistoria
            dadosSelecionados={vistoriasSelecionadas}
            mostraLinhaSelecionada={(dado) => `${dado.km_inicial}`}
            mostraLinha={(dado) => `${dado.id} - ${dado.nome}`}
            tituloBotao="Cadastrar Vistoria"
            estadoBotao={false}
            titulo="Vistorias"
            textoAdd="Adicionar"
            removerSelecao={(index) => removerVistoria(index)}
            handleAdd={(vistoria) => {
              addVistoria(vistoria);
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: "12px", flexShrink: 0 }}>
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
            atualizaAtendimento();
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

export default StepAtendimento;
