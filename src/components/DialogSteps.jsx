import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import StepIdentificação from "./StepIdentificação";
import StepSinistro from "./StepSinistro";
import StepAtendimento from "./StepAtendimento";
import StepRelatorio from "./StepRelatorio";
import StepRelacionamento from "./StepRelacionamento";
import StepVistoria from "./StepVistoria";
import StepFinanceiro from "./StepFinanceiro";
import { buscaProcessoById } from "../chamadasApi/processoApi";
import { toast } from "react-toastify";

const DialogSteps = ({ open, onClose, processoId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [processo, setProcesso] = useState(null);
  const [carregandoProcesso, setCarregandoProcesso] = useState(false);
  const [processoIdState, setProcessoIdState] = useState(-1);
  const [sinistroIdState, setSinistroIdState] = useState(-1);
  const [atendimentoIdState, setAtendimentoIdState] = useState(-1);
  const [relatorioIdState, setRelatorioIdState] = useState(-1);
  const [relacionamentoIdState, setRelacionamentoIdState] = useState(-1);
  const [vistoriaIdState, setVistoriaIdState] = useState(-1);
  const [financeiroIdState, setFinanceiroIdState] = useState(-1);

  const getStepColor = (step) => {
    switch (step) {
      case 0:
        return "black";
      case 1:
        return "black";
      case 2:
        return "yellow";
      case 3:
        return "green";
      case 4:
        return "grey";
      case 5:
        return "pink";
      case 6:
        return "orange";
      default:
        return "green";
    }
  };

  const getNumberLabelColor = (step) => {
    switch (step) {
      case 0:
        return "white";
      case 1:
        return "white";
      case 2:
        return "black";
      case 3:
        return "white";
      case 4:
        return "white";
      case 5:
        return "black";
      case 6:
        return "black";
      default:
        return "white";
    }
  };

  const steps = [
    "Identificação",
    "Sinistro",
    "Atendimento",
    "Relatório",
    "Relacionamento",
    "Vistoria",
    "Financeiro",
  ];

  useEffect(() => {
    if (processoId >= 0) {
      setProcessoIdState(processoId);
    }
  }, [processoId]);

  useEffect(() => {
    if (processoIdState >= 0 && activeStep === 0) {
      buscarProcesso(processoIdState);
    } else {
      setProcesso(null);
    }
  }, [processoIdState, activeStep]);

  const buscarProcesso = (id) => {
    setCarregandoProcesso(true);
    buscaProcessoById(id)
      .then((dados) => {
        setProcesso(dados);
        setSinistroIdState(dados.id_sinistro ?? -1);
        setAtendimentoIdState(dados.id_atendimento ?? -1);
        setRelatorioIdState(dados.id_compartilhamento_relatorio ?? -1);
        setRelacionamentoIdState(dados.id_solicitacao_documento ?? -1);
        setVistoriaIdState(dados.id_certificado_vistoria ?? -1);
        setFinanceiroIdState(dados.id_financeiro ?? -1);
        setCarregandoProcesso(false);
      })
      .catch((error) => {
        setCarregandoProcesso(false);
        toast.error(
          `Erro ao buscar informações do processo: ${error.toString()}`,
          {
            theme: "colored",
          }
        );
      });
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const setId = (id) => {
    setProcessoIdState(id);
  };

  const setIdSinistro = (id) => {
    setSinistroIdState(id);
  };

  const setIdAtendimento = (id) => {
    setAtendimentoIdState(id);
  };

  const setIdRelatorio = (id) => {
    setRelatorioIdState(id);
  };

  const setIdRelacionamento = (id) => {
    setRelacionamentoIdState(id);
  };

  const setIdVistoria = (id) => {
    setVistoriaIdState(id);
  };

  const handleSubmit = () => {
    setActiveStep(0);
    setProcessoIdState(-1);
    setSinistroIdState(-1);
    setAtendimentoIdState(-1);
    setRelatorioIdState(-1);
    setVistoriaIdState(-1);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {activeStep === 0 && (
          <div style={{ display: "flex" }}>
            <Typography
              sx={{
                marginRight: "5px",
                fontWeight: "bolder",
                fontSize: "15px",
              }}
            >
              Identificação
            </Typography>
            <CircleIcon sx={{ color: "black" }} />
          </div>
        )}
        {activeStep === 1 && (
          <div style={{ display: "flex" }}>
            <Typography
              sx={{
                marginRight: "5px",
                fontWeight: "bolder",
                fontSize: "15px",
              }}
            >
              Sinistro
            </Typography>
            <CircleIcon sx={{ color: "black" }} />
          </div>
        )}
        {activeStep === 2 && (
          <div style={{ display: "flex" }}>
            <Typography
              sx={{
                marginRight: "5px",
                fontWeight: "bolder",
                fontSize: "15px",
              }}
            >
              Atendimento
            </Typography>
            <CircleIcon sx={{ color: "yellow" }} />
          </div>
        )}
        {activeStep === 3 && (
          <div style={{ display: "flex" }}>
            <Typography
              sx={{
                marginRight: "5px",
                fontWeight: "bolder",
                fontSize: "15px",
              }}
            >
              Relatório
            </Typography>
            <CircleIcon sx={{ color: "green" }} />
          </div>
        )}
        {activeStep === 4 && (
          <div style={{ display: "flex" }}>
            <Typography
              sx={{
                marginRight: "5px",
                fontWeight: "bolder",
                fontSize: "15px",
              }}
            >
              Relacionamento
            </Typography>
            <CircleIcon sx={{ color: "grey" }} />
          </div>
        )}
        {activeStep === 5 && (
          <div style={{ display: "flex" }}>
            <Typography
              sx={{
                marginRight: "5px",
                fontWeight: "bolder",
                fontSize: "15px",
              }}
            >
              Vistoria
            </Typography>
            <CircleIcon sx={{ color: "pink" }} />
          </div>
        )}
        {activeStep === 6 && (
          <div style={{ display: "flex" }}>
            <Typography
              sx={{
                marginRight: "5px",
                fontWeight: "bolder",
                fontSize: "15px",
              }}
            >
              Financeiro
            </Typography>
            <CircleIcon sx={{ color: "orange" }} />
          </div>
        )}
      </DialogTitle>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step
            key={label}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "secondary.dark",
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                {
                  color: "grey.500",
                },
              "& .MuiStepLabel-root .Mui-active": {
                color: getStepColor(index),
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                {
                  color: "common.white",
                },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: getNumberLabelColor(index),
              },
            }}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <DialogContent>
        {activeStep === 0 && (
          <StepIdentificação
            handleNext={handleNext}
            processo={processo}
            carregando={carregandoProcesso}
            setId={(id) => setId(id)}
          />
        )}
        {activeStep === 1 && (
          <StepSinistro
            handleBack={handleBack}
            handleNext={handleNext}
            sinistroId={sinistroIdState}
            processoId={processoIdState}
            setId={(id) => setIdSinistro(id)}
          />
        )}
        {activeStep === 2 && (
          <StepAtendimento
            handleBack={handleBack}
            handleNext={handleNext}
            atendimentoId={atendimentoIdState}
            processoId={processoIdState}
            setId={(id) => setIdAtendimento(id)}
          />
        )}
        {activeStep === 3 && (
          <StepRelatorio
            handleBack={handleBack}
            handleNext={handleNext}
            relatorioId={relatorioIdState}
            processoId={processoIdState}
            setId={(id) => setIdRelatorio(id)}
          />
        )}
        {activeStep === 4 && (
          <StepRelacionamento
            handleBack={handleBack}
            handleNext={handleNext}
            relacionamentoId={relacionamentoIdState}
            processoId={processoIdState}
            setId={(id) => setIdRelacionamento(id)}
          />
        )}
        {activeStep === 5 && (
          <StepVistoria
            handleBack={handleBack}
            handleNext={handleNext}
            vistoriaId={vistoriaIdState}
            processoId={processoIdState}
            setId={(id) => setIdVistoria(id)}
          />
        )}
        {activeStep === 6 && (
          <StepFinanceiro
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            financeiroId={financeiroIdState}
            processoId={processoIdState}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setActiveStep(0);
            setProcessoIdState(-1);
            setSinistroIdState(-1);
            setAtendimentoIdState(-1);
            setRelatorioIdState(-1);
            setVistoriaIdState(-1);
            onClose();
          }}
          color="secondary"
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSteps;
