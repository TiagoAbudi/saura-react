import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { withStyles } from "@mui/styles";
import { toast } from "react-toastify";
import CampoTexto from "./CampoTexto";
import FiltroData from "./FiltroData";
import { Divider } from "@mui/material";

const styles = (theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  lista: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  campos: {},
  inteiro: {
    minWidth: "50%",
    width: "50%",
  },
  select: {
    margin: 10,
    width: "50%",
  },
  submit: {
    margin: 3,
    backgroundColor: "green",
  },
  submitCancelar: {
    margin: 3,
    backgroundColor: "red",
  },
});

const ListaAddVistoria = (props) => {
  const [mostraMenu, setMostraMenu] = React.useState("false");
  const [kmInicial, setKmInicial] = useState("");
  const [conclusaoKmFinal, setConclusaoKmFinal] = useState("");
  const [dataHoraAcao, setDataHoraAcao] = useState(new Date());
  const [dataHoraInicioDeslocamento, setDataHoraInicioDeslocamento] = useState(
    new Date()
  );
  const [dataChegada, setDataChegada] = useState(new Date());
  const [conclusaoData, setConclusaoData] = useState(new Date());
  const [kmChegada, setKmChegada] = useState("");
  const [tempoDeslocamento, setTempoDeslocamento] = useState("");
  const [tempoTotalAtendimento, setTempoTotalAtendimento] = useState("");

  const handleClick = () => {
    if (
      kmInicial &&
      conclusaoKmFinal &&
      kmChegada &&
      tempoDeslocamento &&
      tempoTotalAtendimento
    ) {
      props.handleAdd({
        data_hora_acao: dataHoraAcao,
        data_hora_inicio_deslocamento: dataHoraInicioDeslocamento,
        km_inicial: parseInt(kmInicial),
        data_chegada: dataChegada,
        km_chegada: parseInt(kmChegada),
        tempo_deslocamento: tempoDeslocamento,
        conclusao_data: conclusaoData,
        conclusao_km_final: parseInt(conclusaoKmFinal),
        tempo_total_atendimento: tempoTotalAtendimento,
      });
      setMostraMenu(false);
    } else {
      toast.error("Selecione todos os campos");
    }
  };

  const handleCancelar = () => {
    setMostraMenu(false);
  };

  const removerSelecao = (index) => {
    props.removerSelecao(index);
    //setChecked(!checked);
  };

  return (
    <div>
      <div>
        <h4>{props.titulo}</h4>
        {props.dadosSelecionados.map((dado, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              //disabled={props.estadoBotao}
              onClick={() => removerSelecao(index)}
              size="large"
            >
              <CloseIcon />
            </IconButton>

            <div style={{ flex: 1, marginLeft: 10, flexDirection: "column" }}>
              <span>Vistoria {index + 1}</span>
              <div style={{ marginTop: "12px" }}>
                <div>
                  <FiltroData
                    dataInicial={dado.data_hora_acao}
                    dialogData={true}
                    titulo="Data e Hora da Ação"
                    largura="33%"
                    hora={true}
                    disabled={true}
                  />

                  <FiltroData
                    dataInicial={dado.data_hora_inicio_deslocamento}
                    dialogData={true}
                    titulo="Data e Hora do início do desclocamento"
                    largura="33%"
                    hora={true}
                    disabled={true}
                  />

                  <CampoTexto
                    style={{ width: "32.5%" }}
                    name="kmInicial"
                    id="kmInicial"
                    label="KM Inicial"
                    tipo="number"
                    value={dado.km_inicial}
                    disabled={true}
                  />
                </div>

                <div>
                  <FiltroData
                    dataInicial={dado.data_chegada}
                    dialogData={true}
                    titulo="Data Chegada"
                    largura="33%"
                    disabled={true}
                  />

                  <CampoTexto
                    style={{ width: "32.5%", marginRight: "5px" }}
                    name="kmChegada"
                    id="kmChegada"
                    label="KM Chegada"
                    tipo="number"
                    value={dado.km_chegada}
                    disabled={true}
                  />

                  <CampoTexto
                    style={{ width: "32.5%" }}
                    name="tempoDeslocamento"
                    id="tempoDeslocamento"
                    label="Tempo de deslocamento"
                    tipo="text"
                    value={dado.tempo_deslocamento}
                    disabled={true}
                  />
                </div>
                <div>
                  <FiltroData
                    dataInicial={dado.conclusao_data}
                    dialogData={true}
                    titulo="Data de conclusão"
                    largura="33%"
                    disabled={true}
                  />

                  <CampoTexto
                    style={{ width: "32.5%", marginRight: "5px" }}
                    name="conclusaoKmFinal"
                    id="conclusaoKmFinal"
                    label="Conclusão Km Final"
                    tipo="number"
                    value={dado.conclusao_km_final}
                    disabled={true}
                  />

                  <CampoTexto
                    style={{ width: "32.5%" }}
                    name="tempoTotalAtendimento"
                    id="tempoTotalAtendimento"
                    label="Tempo Total Atendimento"
                    tipo="text"
                    value={dado.tempo_total_atendimento}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {mostraMenu === true ? (
          <div>
            <div style={{ width: "100%", height: "20px" }}>
              <Divider orientation="horizontal" flexItem />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <span>Cadastro de vistoria</span>
            </div>
            <div>
              <FiltroData
                dataInicial={dataHoraAcao}
                onSelectDataInicial={(date) => {
                  console.log(date.toString());
                  setDataHoraAcao(date);
                }}
                dialogData={true}
                titulo="Data e Hora da Ação"
                largura="33%"
                hora={true}
              />

              <FiltroData
                dataInicial={dataHoraInicioDeslocamento}
                onSelectDataInicial={(date) =>
                  setDataHoraInicioDeslocamento(date)
                }
                dialogData={true}
                titulo="Data e Hora do início do desclocamento"
                largura="33%"
                hora={true}
              />

              <CampoTexto
                style={{ width: "32.5%" }}
                name="kmInicial"
                id="kmInicial"
                label="KM Inicial"
                tipo="number"
                required={true}
                value={kmInicial}
                focusnext="conclusaoKmFinal"
                onChange={(e) => setKmInicial(e.target.value)}
              />
            </div>

            <div>
              <FiltroData
                dataInicial={dataChegada}
                onSelectDataInicial={(date) => setDataChegada(date)}
                dialogData={true}
                titulo="Data Chegada"
                largura="33%"
              />

              <CampoTexto
                style={{ width: "32.5%", marginRight: "5px" }}
                name="kmChegada"
                id="kmChegada"
                label="KM Chegada"
                tipo="number"
                required={true}
                value={kmChegada}
                focusnext="ramo"
                onChange={(e) => setKmChegada(e.target.value)}
              />

              <CampoTexto
                style={{ width: "32.5%" }}
                name="tempoDeslocamento"
                id="tempoDeslocamento"
                label="Tempo de deslocamento"
                tipo="text"
                required={true}
                value={tempoDeslocamento}
                focusnext="ramo"
                onChange={(e) => setTempoDeslocamento(e.target.value)}
              />
            </div>
            <div>
              <FiltroData
                dataInicial={conclusaoData}
                onSelectDataInicial={(date) => setConclusaoData(date)}
                dialogData={true}
                titulo="Data de conclusão"
                largura="33%"
              />

              <CampoTexto
                style={{ width: "32.5%", marginRight: "5px" }}
                name="conclusaoKmFinal"
                id="conclusaoKmFinal"
                label="Conclusão Km Final"
                tipo="number"
                required={true}
                value={conclusaoKmFinal}
                focusnext="ramo"
                onChange={(e) => setConclusaoKmFinal(e.target.value)}
              />

              <CampoTexto
                style={{ width: "32.5%" }}
                name="tempoTotalAtendimento"
                id="tempoTotalAtendimento"
                label="Tempo Total Atendimento"
                tipo="text"
                required={true}
                value={tempoTotalAtendimento}
                focusnext="ramo"
                onChange={(e) => setTempoTotalAtendimento(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <Button
                onClick={handleCancelar}
                style={{
                  color: "#f2f2f2",
                  background: "red",
                  fontFamily: `"Roboto", sans-serif`,
                  fontWeight: "bold",
                  borderRadius: "7px",
                  marginRight: "10px",
                }}
              >
                Cancelar
              </Button>

              <Button
                style={{
                  width: "187px",
                  fontWeight: "bold",
                  fontFamily: `"Roboto", sans-serif`,
                  backgroundColor: "#03A62C",
                  borderRadius: "7px",
                  color: "#f2f2f2",
                }}
                type="submit"
                variant="contained"
                id="btnAdd"
                onClick={handleClick}
              >
                {props.textoAdd}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            style={{
              width: "187px",
              fontWeight: "bold",
              fontFamily: `"Roboto", sans-serif`,
              backgroundColor: "#03A62C",
              color: "#f2f2f2",
            }}
            type="submit"
            variant="contained"
            onClick={() => setMostraMenu(true)}
            id="cadastra"
            disabled={props.estadoBotao}
          >
            {props.tituloBotao}
          </Button>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(ListaAddVistoria);
