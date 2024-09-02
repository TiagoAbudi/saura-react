import React, { useEffect, useState } from "react";
import CampoTexto from "./CampoTexto";
import { Button, CircularProgress } from "@mui/material";
import FiltroData from "./FiltroData";
import ListaAddReiteracoes from "./ListaAddReiteracoes";
import ListaAddMetodosRecebimentoDocumental from "./ListaAddMetodosRecebimentoDocumental";
import {
  atualizarRelacionamento,
  buscarRelacionamentoById,
} from "../chamadasApi/processoApi";
import { toast } from "react-toastify";

const StepRelacionamento = ({
  handleBack,
  handleNext,
  relacionamentoId,
  processoId,
  setId,
}) => {
  const [dataInicioEtapa, setDataInicioEtapa] = useState(new Date());
  const [tempoInerciaInicioEtapa, setTempoInerciaInicioEtapa] = useState("");
  const [
    dataSolicitacaoInicialDocumentos,
    setDataSolicitacaoInicialDocumentos,
  ] = useState(new Date());
  const [
    tempoInerciaSolicitacaoInicialDocumentos,
    setTempoInerciaSolicitacaoInicialDocumentos,
  ] = useState(new Date());
  const [dataRecebimentoUltimoDocumento, setDataRecebimentoUltimoDocumento] =
    useState(new Date());
  const [dataTransicaoPasta, setDataTransicaoPasta] = useState(new Date());
  const [tempoEtapa02, setTempoEtapa02] = useState("");
  const [inicioPreenchimentoInicial, setInicioPreenchimentoInicial] = useState(
    new Date()
  );
  const [fimPreenchimentoInicial, setFimPreenchimentoInicial] = useState(
    new Date()
  );
  const [tempoAcaoPreenchimentoInicial, setTempoAcaoPreenchimentoInicial] =
    useState("");
  const [tipoAcaoPreenchimentoInicial, setTipoAcaoPreenchimentoInicial] =
    useState("");
  const [responsavelPreenchimentoInicial, setResponsavelPreenchimentoInicial] =
    useState("");
  const [reiteracoesSelecionadas, setReiteracoesSelecionadas] = useState([]);
  const [
    metodosRecebimentoDocumentalSelecionadas,
    setMetodosRecebimentoDocumentalSelecionadas,
  ] = useState([]);

  const [carregando, setCarregando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    if (relacionamentoId && relacionamentoId >= 0) {
      buscarRelacionamento(relacionamentoId);
    }
  }, [relacionamentoId]);

  const buscarRelacionamento = (id) => {
    setCarregando(true);
    buscarRelacionamentoById(id)
      .then((dados) => {
        setDataInicioEtapa(dados.data_inicio_etapa);
        setTempoInerciaInicioEtapa(dados.tempo_inercia_inicio_etapa);
        setDataSolicitacaoInicialDocumentos(
          dados.data_solicitacao_inicial_documentos
        );
        setTempoInerciaSolicitacaoInicialDocumentos(
          dados.tempo_inercia_solicitacao_inicial_documentos
        );
        setDataRecebimentoUltimoDocumento(
          dados.data_recebimento_ultimo_documento
        );
        setDataTransicaoPasta(dados.data_transicao_pasta);
        setTempoEtapa02(dados.tempo_etapa_02);
        setInicioPreenchimentoInicial(dados.inicio_preenchimento_inicial);
        setFimPreenchimentoInicial(dados.fim_preenchimento_inicial);
        setTempoAcaoPreenchimentoInicial(
          dados.tempo_acao_preenchimento_inicial
        );
        setTipoAcaoPreenchimentoInicial(dados.tipo_acao_preenchimento_inicial);
        setResponsavelPreenchimentoInicial(
          dados.responsavel_preenchimento_inicial
        );
        setReiteracoesSelecionadas(dados.reiteracao);
        setMetodosRecebimentoDocumentalSelecionadas(
          dados.metodo_recebimento_documental
        );
        setCarregando(false);
      })
      .catch((error) => {
        toast.error(
          `Erro ao buscar informações do relacionamento: ${error.toString()}`,
          {
            theme: "colored",
          }
        );
        setCarregando(false);
      });
  };

  const atualizaRelacionamento = () => {
    setAtualizando(true);
    atualizarRelacionamento(processoId, {
      data_inicio_etapa: dataInicioEtapa,
      tempo_inercia_inicio_etapa: tempoInerciaInicioEtapa,
      data_solicitacao_inicial_documentos: dataSolicitacaoInicialDocumentos,
      tempo_inercia_solicitacao_inicial_documentos:
        tempoInerciaSolicitacaoInicialDocumentos,
      data_recebimento_ultimo_documento: dataRecebimentoUltimoDocumento,
      data_transicao_pasta: dataTransicaoPasta,
      tempo_etapa_02: tempoEtapa02,
      inicio_preenchimento_inicial: inicioPreenchimentoInicial,
      fim_preenchimento_inicial: fimPreenchimentoInicial,
      tempo_acao_preenchimento_inicial: tempoAcaoPreenchimentoInicial,
      tipo_acao_preenchimento_inicial: tipoAcaoPreenchimentoInicial,
      responsavel_preenchimento_inicial: responsavelPreenchimentoInicial,
      reiteracoes: reiteracoesSelecionadas,
      metodosRecebimentoDocumental: metodosRecebimentoDocumentalSelecionadas,
    })
      .then((dados) => {
        console.log(dados);
        toast.success("Relacionamento atualizado!");
        setAtualizando(false);
        setId(dados.data.id ?? -1);
        handleNext();
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message ?? error.toString();
        toast.error(`Erro ao atualizar relacionamento: ${errorMessage}`);
        console.log(error);
        setAtualizando(false);
      });
  };

  const removerReiteracao = (indice) => {
    const novasReiteracoes = [...reiteracoesSelecionadas];
    novasReiteracoes.splice(indice, 1);
    setReiteracoesSelecionadas(novasReiteracoes);
  };

  const addReiteracao = (reiteracao) => {
    const novasReiteracoes = [...reiteracoesSelecionadas, reiteracao];
    setReiteracoesSelecionadas(novasReiteracoes);
  };

  const removerMetodosRecebimentoDocumental = (indice) => {
    const novasMetodos = [...metodosRecebimentoDocumentalSelecionadas];
    novasMetodos.splice(indice, 1);
    setMetodosRecebimentoDocumentalSelecionadas(novasMetodos);
  };

  const addMetodosRecebimentoDocumental = (metodo) => {
    const novasMetodos = [...metodosRecebimentoDocumentalSelecionadas, metodo];
    setMetodosRecebimentoDocumentalSelecionadas(novasMetodos);
  };

  if (carregando) {
    return <CircularProgress />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "60vh" }}>
      <div style={{ flex: "1 0 auto" }}>
        <div>
          <FiltroData
            dataInicial={dataInicioEtapa}
            onSelectDataInicial={(date) => setDataInicioEtapa(date)}
            dialogData={true}
            titulo="Data Início Etapa"
            largura="30.6%"
          />

          <CampoTexto
            style={{ width: "30%", marginRight: "5px" }}
            name="tempoInerciaInicioEtapa"
            id="tempoInerciaInicioEtapa"
            label="Tempo Inércia Início Etapa"
            required={true}
            value={tempoInerciaInicioEtapa}
            focusnext="select-licenca"
            onChange={(e) => setTempoInerciaInicioEtapa(e.target.value)}
          />

          <FiltroData
            dataInicial={dataSolicitacaoInicialDocumentos}
            onSelectDataInicial={(date) =>
              setDataSolicitacaoInicialDocumentos(date)
            }
            dialogData={true}
            titulo="Data Solicitação Inicial Documentos"
            largura="30.6%"
          />
        </div>
        <div>
          <FiltroData
            dataInicial={tempoInerciaSolicitacaoInicialDocumentos}
            onSelectDataInicial={(date) =>
              setTempoInerciaSolicitacaoInicialDocumentos(date)
            }
            dialogData={true}
            titulo="Tempo Inércia Solicitação Inicial Documentos"
            largura="30.6%"
          />

          <FiltroData
            dataInicial={dataRecebimentoUltimoDocumento}
            onSelectDataInicial={(date) =>
              setDataRecebimentoUltimoDocumento(date)
            }
            dialogData={true}
            titulo="Data Recebimento Último Documento"
            largura="30.6%"
          />

          <FiltroData
            dataInicial={dataTransicaoPasta}
            onSelectDataInicial={(date) => setDataTransicaoPasta(date)}
            dialogData={true}
            titulo="Data Transição Pasta"
            largura="30.6%"
          />
        </div>
        <div>
          <CampoTexto
            style={{ width: "30%", marginRight: "5px" }}
            name="tempoEtapa02"
            id="tempoEtapa02"
            label="Tempo Etapa 2"
            required={true}
            value={tempoEtapa02}
            focusnext="select-licenca"
            onChange={(e) => setTempoEtapa02(e.target.value)}
          />

          <FiltroData
            dataInicial={inicioPreenchimentoInicial}
            onSelectDataInicial={(date) => setInicioPreenchimentoInicial(date)}
            dialogData={true}
            titulo="Inicio Preenchimento Inicial"
            largura="30.6%"
          />

          <FiltroData
            dataInicial={fimPreenchimentoInicial}
            onSelectDataInicial={(date) => setFimPreenchimentoInicial(date)}
            dialogData={true}
            titulo="Fim Preenchimento Inicial"
            largura="30.6%"
          />
        </div>
        <div>
          <CampoTexto
            style={{ width: "30%", marginRight: "5px" }}
            name="tempoAcaoPreenchimentoInicial"
            id="tempoAcaoPreenchimentoInicial"
            label="Tempo Ação Preenchimento Inicial"
            required={true}
            value={tempoAcaoPreenchimentoInicial}
            focusnext="select-licenca"
            onChange={(e) => setTempoAcaoPreenchimentoInicial(e.target.value)}
          />

          <CampoTexto
            style={{ width: "30%", marginRight: "5px" }}
            name="tipoAcaoPreenchimentoInicial"
            id="tipoAcaoPreenchimentoInicial"
            label="Tipo Ação Preenchimento Inicial"
            required={true}
            value={tipoAcaoPreenchimentoInicial}
            focusnext="select-licenca"
            onChange={(e) => setTipoAcaoPreenchimentoInicial(e.target.value)}
          />

          <CampoTexto
            style={{ width: "30%", marginRight: "5px" }}
            name="responsavelPreenchimentoInicial"
            id="responsavelPreenchimentoInicial"
            label="Responsável Preenchimento Inicial"
            required={true}
            value={responsavelPreenchimentoInicial}
            focusnext="select-licenca"
            onChange={(e) => setResponsavelPreenchimentoInicial(e.target.value)}
          />
        </div>
        <div>
          <ListaAddReiteracoes
            dadosSelecionados={reiteracoesSelecionadas}
            mostraLinha={(dado) => `${dado.id} - ${dado.nome}`}
            tituloBotao="Cadastrar Reiteração"
            estadoBotao={false}
            titulo="Reiterações"
            textoAdd="Adicionar"
            removerSelecao={(index) => removerReiteracao(index)}
            handleAdd={(reiteracao) => {
              addReiteracao(reiteracao);
            }}
          />
        </div>
        <div>
          <ListaAddMetodosRecebimentoDocumental
            dadosSelecionados={metodosRecebimentoDocumentalSelecionadas}
            mostraLinha={(dado) => `${dado.id} - ${dado.nome}`}
            tituloBotao="Cadastrar Métodos Recebimento Documental"
            estadoBotao={false}
            titulo="Métodos Recebimento Documental"
            textoAdd="Adicionar"
            removerSelecao={(index) =>
              removerMetodosRecebimentoDocumental(index)
            }
            handleAdd={(metodo) => {
              addMetodosRecebimentoDocumental(metodo);
            }}
            handleCheckbox={(lista, idSelecionado) => {
              console.log(lista);
              setMetodosRecebimentoDocumentalSelecionadas(lista);
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
            atualizaRelacionamento();
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

export default StepRelacionamento;
