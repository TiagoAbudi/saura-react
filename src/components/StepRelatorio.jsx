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
import SelectDados from "./SelectDados";
import {
  atualizarRelatorio,
  buscarRelatorioById,
} from "../chamadasApi/processoApi";
import { toast } from "react-toastify";

const StepRelatorio = ({
  handleBack,
  handleNext,
  relatorioId,
  processoId,
  setId,
}) => {
  const [metodo_aplicativo_premium, setMetodo_aplicativo_premium] =
    useState(false);
  const [metodo_sistema_premium, setMetodo_sistema_premium] = useState(false);
  const [metodo_equipe_interna, setMetodo_equipe_interna] = useState(false);
  const [metodo_manual, setMetodo_manual] = useState(false);
  const [metodo_outros, setMetodo_outros] = useState(false);
  const [imagens_coletadas, setImagens_coletadas] = useState(false);
  const [documentos_coletadas, setDocumentos_coletadas] = useState(false);
  const [obtido_informacao_inicial, setObtido_informacao_inicial] = useState(0);

  const [coleta_documentos_no_local, setColeta_documentos_no_local] =
    useState(2);
  const [utilizou_aplicativo_premium, setUtilizou_aplicativo_premium] =
    useState(0);
  const [seguiu_manual_boas_praticas, setSeguiu_manual_boas_praticas] =
    useState(0);
  const [data_hora_informacao_inicial, setData_hora_informacao_inicial] =
    useState(new Date());
  const [
    data_hora_recebimento_documentos,
    setData_hora_recebimento_documentos,
  ] = useState(new Date());
  const [tempo_frequencia_comunicacao, setTempo_frequencia_comunicacao] =
    useState(5);
  const [
    analista_responsavel_cenario_crise,
    setAnalista_responsavel_cenario_crise,
  ] = useState("");
  const [contrato, setContrato] = useState("");
  const [meta_informacao_inicial, setMeta_informacao_inicial] = useState("");
  const [maximo_tempo_envio, setMaximo_tempo_envio] = useState("");
  const [meta_tempo_envio, setMeta_tempo_envio] = useState("");
  const [obtido_tempo_envio_documentos, setObtido_tempo_envio_documentos] =
    useState(0);

  const [carregando, setCarregando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    if (relatorioId && relatorioId >= 0) {
      buscarRelatorios(relatorioId);
    }
  }, [relatorioId]);

  const buscarRelatorios = (id) => {
    setCarregando(true);
    buscarRelatorioById(id)
      .then((dados) => {
        setMetodo_aplicativo_premium(dados.metodo_aplicativo_premium);
        setMetodo_sistema_premium(dados.metodo_sistema_premium);
        setMetodo_equipe_interna(dados.metodo_equipe_interna);
        setMetodo_manual(dados.metodo_manual);
        setMetodo_outros(dados.metodo_outros);
        setColeta_documentos_no_local(dados.coleta_documentos_no_local);
        setImagens_coletadas(dados.imagens_coletadas);
        setDocumentos_coletadas(dados.documentos_coletadas);
        setContrato(dados.contrato);
        setMeta_informacao_inicial(dados.meta_informacao_inicial);
        setData_hora_informacao_inicial(dados.data_hora_informacao_inicial);
        setObtido_informacao_inicial(dados.obtido_informacao_inicial);
        setTempo_frequencia_comunicacao(dados.tempo_frequencia_comunicacao);
        setUtilizou_aplicativo_premium(dados.utilizou_aplicativo_premium);
        setSeguiu_manual_boas_praticas(dados.seguiu_manual_boas_praticas);
        setMaximo_tempo_envio(dados.maximo_tempo_envio);
        setMeta_tempo_envio(dados.meta_tempo_envio);
        setObtido_tempo_envio_documentos(dados.obtido_tempo_envio_documentos);
        setData_hora_recebimento_documentos(
          dados.data_hora_recebimento_documentos
        );
        setAnalista_responsavel_cenario_crise(
          dados.analista_responsavel_cenario_crise
        );
        setCarregando(false);
      })
      .catch((error) => {
        toast.error(
          `Erro ao buscar informações do compartilhamento de documentos: ${error.toString()}`,
          {
            theme: "colored",
          }
        );
        setCarregando(false);
      });
  };

  const atualizaRelatorio = () => {
    setAtualizando(true);
    atualizarRelatorio(processoId, {
      metodo_aplicativo_premium,
      metodo_sistema_premium,
      metodo_equipe_interna,
      metodo_manual,
      metodo_outros,
      coleta_documentos_no_local,
      imagens_coletadas,
      documentos_coletadas,
      contrato,
      meta_informacao_inicial,
      data_hora_informacao_inicial,
      obtido_informacao_inicial,
      tempo_frequencia_comunicacao,
      utilizou_aplicativo_premium,
      seguiu_manual_boas_praticas,
      maximo_tempo_envio,
      meta_tempo_envio,
      data_hora_recebimento_documentos,
      obtido_tempo_envio_documentos,
      analista_responsavel_cenario_crise,
    })
      .then((dados) => {
        toast.success("Compartilhamento de relatórios atualizado!");
        setAtualizando(false);
        setId(dados.data.id ?? -1);
        handleNext();
      })
      .catch((error) => {
        toast.error("Erro ao atualizar compartilhamento de relatórios");
        console.log(error);
        setAtualizando(false);
      });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case "metodo_aplicativo_premium":
        setMetodo_aplicativo_premium(checked);
        break;
      case "metodo_sistema_premium":
        setMetodo_sistema_premium(checked);
        break;
      case "metodo_manual":
        setMetodo_manual(checked);
        break;
      case "metodo_outros":
        setMetodo_outros(checked);
        break;
      case "metodo_equipe_interna":
        setMetodo_equipe_interna(checked);
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
          height: "65px",
          gap: "8px",
        }}
      >
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={metodo_aplicativo_premium}
                onChange={handleCheckboxChange}
                name="metodo_aplicativo_premium"
              />
            }
            label="Aplicativo Premium"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={metodo_sistema_premium}
                onChange={handleCheckboxChange}
                name="metodo_sistema_premium"
              />
            }
            label="Sistema Premium (Desktop)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={metodo_equipe_interna}
                onChange={handleCheckboxChange}
                name="metodo_equipe_interna"
              />
            }
            label="Equipe tecnica interna"
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
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={metodo_manual}
                onChange={handleCheckboxChange}
                name="metodo_manual"
              />
            }
            label="Manual"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={metodo_outros}
                onChange={handleCheckboxChange}
                name="metodo_outros"
              />
            }
            label="Outros"
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
        <SelectDados
          name="coleta_documentos_no_local"
          onSelected={(doc) => {
            setColeta_documentos_no_local(doc.id);
          }}
          width={210}
          idInicial={coleta_documentos_no_local}
          dados={[
            {
              id: 1,
              titulo: "Eficiente",
            },
            {
              id: 2,
              titulo: "Parcial",
            },
            {
              id: 3,
              titulo: "Regular",
            },
          ]}
          titulo={"Coleta de Documentos no Local da vistoria"}
          label={"documento"}
        />
        <SelectDados
          name="documentos_coletadas"
          onSelected={(doc) => {
            setDocumentos_coletadas(doc.id === 0 ? false : true);
          }}
          width={200}
          idInicial={documentos_coletadas === false ? 0 : 1}
          dados={[
            {
              id: 0,
              titulo: "Não",
            },
            {
              id: 1,
              titulo: "Sim",
            },
          ]}
          titulo={"Documentos (Legíveis e Padronizados)"}
          label={"documentos-coletadas"}
        />
        <SelectDados
          name="imagens_coletadas"
          onSelected={(doc) => {
            setImagens_coletadas(doc.id === 0 ? false : true);
          }}
          width={260}
          idInicial={imagens_coletadas === false ? 0 : 1}
          dados={[
            {
              id: 0,
              titulo: "Não",
            },
            {
              id: 1,
              titulo: "Sim",
            },
          ]}
          titulo={"Imagens (Formato JPEG, Renomeadas e Sequenciais)"}
          label={"imagens-coletadas"}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "120px",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 16, fontWeight: "bold" }}>
            INFORMAÇÃO INICIAL DO LOCAL DA VISTORIA
          </span>

          <span style={{ fontSize: 12, marginBottom: "8px" }}>
            (Vistoriador X Reguladora – base hora de chegada no local)
          </span>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <CampoTexto
              style={{ width: "25%" }}
              name="contrato"
              id="contrato"
              label="Contrato"
              tipo="text"
              value={contrato}
              focusnext="meta_informacao_inicial"
              onChange={(e) => setContrato(e.target.value)}
            />
            <CampoTexto
              style={{ width: "25%", marginLeft: "8px" }}
              name="meta_informacao_inicial"
              id="meta_informacao_inicial"
              label="Meta"
              tipo="text"
              value={meta_informacao_inicial}
              onChange={(e) => setMeta_informacao_inicial(e.target.value)}
            />
            <div style={{ width: "30%", marginLeft: "8px" }}>
              <FiltroData
                dataInicial={data_hora_informacao_inicial}
                onSelectDataInicial={(date) =>
                  setData_hora_informacao_inicial(date)
                }
                dialogData={true}
                titulo="Data e hora da informação inicial"
                hora={true}
              />
            </div>
            <SelectDados
              name="obtido_informacao_inicial"
              onSelected={(doc) => {
                setObtido_informacao_inicial(doc.id);
              }}
              width={100}
              idInicial={obtido_informacao_inicial}
              dados={[
                {
                  id: 0,
                  titulo: "Não",
                },
                {
                  id: 1,
                  titulo: "Sim",
                },
                {
                  id: 2,
                  titulo: "Parcial",
                },
              ]}
              titulo={"Obtido"}
              label={"obtido-informacao-inicial"}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "120px",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 16, fontWeight: "bold" }}>
            FREQUÊNCIA DE COMUNICAÇÃO
          </span>
          <span style={{ fontSize: 12, marginBottom: "8px" }}>
            (Vistoriador X Reguladora)
          </span>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <SelectDados
              name="tempo_frequencia_comunicacao"
              onSelected={(doc) => {
                setTempo_frequencia_comunicacao(doc.id);
              }}
              width={210}
              idInicial={tempo_frequencia_comunicacao}
              dados={[
                {
                  id: 5,
                  titulo: "5 min",
                },
                {
                  id: 10,
                  titulo: "10 min",
                },
                {
                  id: 15,
                  titulo: "15 min",
                },
                {
                  id: 20,
                  titulo: "20 min",
                },
                {
                  id: 30,
                  titulo: "30 min",
                },
                {
                  id: 45,
                  titulo: "45 min",
                },
                {
                  id: 60,
                  titulo: "1 hora",
                },
                {
                  id: 61,
                  titulo: "> 1 hora",
                },
              ]}
              titulo={"Frequência de comunicação"}
              label={"frequencia-comunicacao"}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "190px",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 16, fontWeight: "bold" }}>
            UTILIZOU CORRETAMENTE E INTEGRALMENTE O APLICATIVO PREMIUM
          </span>
          <SelectDados
            name="utilizou_aplicativo_premium"
            onSelected={(doc) => {
              setUtilizou_aplicativo_premium(doc.id);
            }}
            width={200}
            idInicial={utilizou_aplicativo_premium}
            dados={[
              {
                id: 0,
                titulo: "Não",
              },
              {
                id: 1,
                titulo: "Sim",
              },
              {
                id: 2,
                titulo: "Parcial",
              },
            ]}
            titulo={"Utilizou aplicativo Premium"}
            label={"app-premium"}
          />
          <span style={{ fontSize: 16, fontWeight: "bold", marginTop: "8px" }}>
            SEGUIU O DETERMINADO PELO MANUAL DE BOAS PRATICAS
          </span>
          <SelectDados
            name="seguiu_manual_boas_praticas"
            onSelected={(doc) => {
              setSeguiu_manual_boas_praticas(doc.id);
            }}
            width={200}
            idInicial={seguiu_manual_boas_praticas}
            dados={[
              {
                id: 0,
                titulo: "Não",
              },
              {
                id: 1,
                titulo: "Sim",
              },
              {
                id: 2,
                titulo: "Parcial",
              },
            ]}
            titulo={"Seguiu manual de boas práticas"}
            label={"boas-praticas"}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 16, fontWeight: "bold" }}>
            TEMPO DE ENVIO DOS DOCUMENTOS PADRÕES OBTIDOS
          </span>

          <span style={{ fontSize: 12, marginBottom: "8px" }}>
            (Vistoriador X Reguladora – base Conclusão da Vistoria)
          </span>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <CampoTexto
              style={{ width: "25%" }}
              name="maximo_tempo_envio"
              id="maximo_tempo_envio"
              label="Máximo"
              tipo="text"
              value={maximo_tempo_envio}
              focusnext="maximo-tempo-envio"
              onChange={(e) => setMaximo_tempo_envio(e.target.value)}
            />
            <CampoTexto
              style={{ width: "25%", marginLeft: "8px" }}
              name="meta_tempo_envio"
              id="meta_tempo_envio"
              label="Meta"
              tipo="text"
              value={meta_tempo_envio}
              onChange={(e) => setMeta_tempo_envio(e.target.value)}
            />
            <div style={{ width: "30%", marginLeft: "8px" }}>
              <FiltroData
                dataInicial={data_hora_recebimento_documentos}
                onSelectDataInicial={(date) =>
                  setData_hora_recebimento_documentos(date)
                }
                dialogData={true}
                titulo="Data e hora do recebimento"
                hora={true}
              />
            </div>
            <SelectDados
              name="obtido_tempo_envio_documentos"
              onSelected={(doc) => {
                setObtido_tempo_envio_documentos(doc.id);
              }}
              width={100}
              idInicial={obtido_tempo_envio_documentos}
              dados={[
                {
                  id: 0,
                  titulo: "Não",
                },
                {
                  id: 1,
                  titulo: "Sim",
                },
                {
                  id: 2,
                  titulo: "Parcial",
                },
              ]}
              titulo={"Obtido"}
              label={"obtido-tempo-envio-documentos"}
            />
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: "65px", marginTop: "16px" }}>
        <CampoTexto
          style={{ width: "62%" }}
          name="analista_responsavel_cenario_crise"
          id="analista_responsavel_cenario_crise"
          label="Analista responsável pelo cenário de crise"
          tipo="text"
          value={analista_responsavel_cenario_crise}
          onChange={(e) =>
            setAnalista_responsavel_cenario_crise(e.target.value)
          }
        />
      </div>
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
          atualizaRelatorio();
        }}
        variant="contained"
        color="primary"
      >
        {atualizando ? <CircularProgress /> : "Próximo"}
      </Button>
    </div>
  );
};

export default StepRelatorio;
