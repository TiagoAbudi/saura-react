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
  atualizarFinanceiro,
  buscarFinanceiroById,
} from "../chamadasApi/processoApi";
import { toast } from "react-toastify";
import { stringToDecimal } from "../util/stringToDecimal";

const StepFinanceiro = ({
  handleBack,
  handleSubmit,
  financeiroId,
  processoId,
}) => {
  const [
    nf_prestacao_servico_reguladora_seguradora,
    setNf_prestacao_servico_reguladora_seguradora,
  ] = useState(false);
  const [
    data_emissao_reguladora_seguradora,
    setData_emissao_reguladora_seguradora,
  ] = useState(new Date());
  const [honorario_reguladora_seguradora, setHonorario_reguladora_seguradora] =
    useState(0);
  const [
    despesas_reguladora_reguladora_seguradora,
    setDespesas_reguladora_reguladora_seguradora,
  ] = useState(0);
  const [
    despesas_sinistro_reguladora_seguradora,
    setDespesas_sinistro_reguladora_seguradora,
  ] = useState(0);
  const [
    total_geral_reguladora_seguradora,
    setTotal_geral_reguladora_seguradora,
  ] = useState(0);
  const [
    data_pagamentos_reguladora_seguradora,
    setData_pagamentos_reguladora_seguradora,
  ] = useState(new Date());
  const [irrf_fiscal_tributario, setIrrf_fiscal_tributario] = useState(0);
  const [pis_fiscal_tributario, setPis_fiscal_tributario] = useState(0);
  const [cofins_fiscal_tributario, setCofins_fiscal_tributario] = useState(0);
  const [csll_fiscal_tributario, setCsll_fiscal_tributario] = useState(0);
  const [issqn_fiscal_tributario, setIssqn_fiscal_tributario] = useState(0);
  const [
    imposto_descontado_fiscal_tributario,
    setImposto_descontado_fiscal_tributario,
  ] = useState(0);
  const [total_imposto_fiscal_tributario, setTotal_imposto_fiscal_tributario] =
    useState(0);
  const [
    nf_prestacao_servico_reguladora_colaborador,
    setNf_prestacao_servico_reguladora_colaborador,
  ] = useState(false);
  const [
    data_emissao_reguladora_colaborador,
    setData_emissao_reguladora_colaborador,
  ] = useState(new Date());
  const [
    honorario_prestador_reguladora_colaborador,
    setHonorario_prestador_reguladora_colaborador,
  ] = useState(0);
  const [
    despesas_prestador_reguladora_colaborador,
    setDespesas_prestador_reguladora_colaborador,
  ] = useState(0);
  const [
    total_geral_reguladora_colaborador,
    setTotal_geral_reguladora_colaborador,
  ] = useState(0);
  const [
    data_pagamento_reguladora_colaborador,
    setData_pagamento_reguladora_colaborador,
  ] = useState(new Date());
  const [cobranca_resultado_financeiro, setCobranca_resultado_financeiro] =
    useState(0);
  const [
    impoosto_premium_resultado_financeiro,
    setImpoosto_premium_resultado_financeiro,
  ] = useState(0);
  const [
    colaborador_resultado_financeiro,
    setColaborador_resultado_financeiro,
  ] = useState(0);
  const [saldo_resultado_financeiro, setSaldo_resultado_financeiro] =
    useState(0);
  const [carregando, setCarregando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    if (financeiroId && financeiroId >= 0) {
      buscarFinanceiro(financeiroId);
    }
  }, [financeiroId]);

  const buscarFinanceiro = (id) => {
    setCarregando(true);
    buscarFinanceiroById(id)
      .then((dados) => {
        setNf_prestacao_servico_reguladora_seguradora(
          dados.nf_prestacao_servico_reguladora_seguradora
        );
        setData_emissao_reguladora_seguradora(
          dados.data_emissao_reguladora_seguradora
        );
        setHonorario_reguladora_seguradora(
          dados.honorario_reguladora_seguradora
        );
        setDespesas_reguladora_reguladora_seguradora(
          dados.despesas_reguladora_reguladora_seguradora
        );
        setDespesas_sinistro_reguladora_seguradora(
          dados.despesas_sinistro_reguladora_seguradora
        );
        setTotal_geral_reguladora_seguradora(
          dados.total_geral_reguladora_seguradora
        );
        setData_pagamentos_reguladora_seguradora(
          dados.data_pagamentos_reguladora_seguradora
        );
        setIrrf_fiscal_tributario(dados.irrf_fiscal_tributario);
        setPis_fiscal_tributario(dados.pis_fiscal_tributario);
        setCofins_fiscal_tributario(dados.cofins_fiscal_tributario);
        setCsll_fiscal_tributario(dados.csll_fiscal_tributario);
        setIssqn_fiscal_tributario(dados.issqn_fiscal_tributario);
        setImposto_descontado_fiscal_tributario(
          dados.imposto_descontado_fiscal_tributario
        );
        setTotal_imposto_fiscal_tributario(
          dados.total_imposto_fiscal_tributario
        );
        setNf_prestacao_servico_reguladora_colaborador(
          dados.nf_prestacao_servico_reguladora_colaborador
        );
        setData_emissao_reguladora_colaborador(
          dados.data_emissao_reguladora_colaborador
        );
        setHonorario_prestador_reguladora_colaborador(
          dados.honorario_prestador_reguladora_colaborador
        );
        setDespesas_prestador_reguladora_colaborador(
          dados.despesas_prestador_reguladora_colaborador
        );
        setTotal_geral_reguladora_colaborador(
          dados.total_geral_reguladora_colaborador
        );
        setData_pagamento_reguladora_colaborador(
          dados.data_pagamento_reguladora_colaborador
        );
        setCobranca_resultado_financeiro(dados.cobranca_resultado_financeiro);
        setImpoosto_premium_resultado_financeiro(
          dados.impoosto_premium_resultado_financeiro
        );
        setColaborador_resultado_financeiro(
          dados.colaborador_resultado_financeiro
        );
        setSaldo_resultado_financeiro(dados.saldo_resultado_financeiro);
        setCarregando(false);
      })
      .catch((error) => {
        toast.error(
          `Erro ao buscar informações do financeiro: ${error.toString()}`,
          {
            theme: "colored",
          }
        );
        setCarregando(false);
      });
  };

  const atualizaFinanceiro = () => {
    setAtualizando(true);
    atualizarFinanceiro(processoId, {
      nf_prestacao_servico_reguladora_seguradora,
      data_emissao_reguladora_seguradora,
      honorario_reguladora_seguradora: stringToDecimal(
        honorario_reguladora_seguradora
      ),
      despesas_reguladora_reguladora_seguradora: stringToDecimal(
        despesas_reguladora_reguladora_seguradora
      ),
      despesas_sinistro_reguladora_seguradora: stringToDecimal(
        despesas_sinistro_reguladora_seguradora
      ),
      total_geral_reguladora_seguradora: stringToDecimal(
        total_geral_reguladora_seguradora
      ),
      data_pagamentos_reguladora_seguradora,
      irrf_fiscal_tributario: stringToDecimal(irrf_fiscal_tributario),
      pis_fiscal_tributario: stringToDecimal(pis_fiscal_tributario),
      cofins_fiscal_tributario: stringToDecimal(cofins_fiscal_tributario),
      csll_fiscal_tributario: stringToDecimal(csll_fiscal_tributario),
      issqn_fiscal_tributario: stringToDecimal(issqn_fiscal_tributario),
      imposto_descontado_fiscal_tributario: stringToDecimal(
        imposto_descontado_fiscal_tributario
      ),
      total_imposto_fiscal_tributario: stringToDecimal(
        total_imposto_fiscal_tributario
      ),
      nf_prestacao_servico_reguladora_colaborador,
      data_emissao_reguladora_colaborador,
      honorario_prestador_reguladora_colaborador: stringToDecimal(
        honorario_prestador_reguladora_colaborador
      ),
      despesas_prestador_reguladora_colaborador: stringToDecimal(
        despesas_prestador_reguladora_colaborador
      ),
      total_geral_reguladora_colaborador: stringToDecimal(
        total_geral_reguladora_colaborador
      ),
      data_pagamento_reguladora_colaborador,
      cobranca_resultado_financeiro: stringToDecimal(
        cobranca_resultado_financeiro
      ),
      impoosto_premium_resultado_financeiro: stringToDecimal(
        impoosto_premium_resultado_financeiro
      ),
      colaborador_resultado_financeiro: stringToDecimal(
        colaborador_resultado_financeiro
      ),
      saldo_resultado_financeiro: stringToDecimal(saldo_resultado_financeiro),
    })
      .then((dados) => {
        toast.success("Financeiro atualizado!");
        setAtualizando(false);
        handleSubmit();
      })
      .catch((error) => {
        toast.error("Erro ao atualizar financeiro");
        console.log(error);
        setAtualizando(false);
      });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case "nf_prestacao_servico_reguladora_seguradora":
        setNf_prestacao_servico_reguladora_seguradora(checked);
        break;
      case "nf_prestacao_servico_reguladora_colaborador":
        setNf_prestacao_servico_reguladora_colaborador(checked);
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
          REGULADORA/SEGURADORA
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
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={nf_prestacao_servico_reguladora_seguradora}
                onChange={handleCheckboxChange}
                name="nf_prestacao_servico_reguladora_seguradora"
              />
            }
            label="NF Prest. serviço N"
          />
        </FormGroup>
        <div style={{ width: "33%" }}>
          <FiltroData
            dataInicial={data_emissao_reguladora_seguradora}
            onSelectDataInicial={(date) =>
              setData_emissao_reguladora_seguradora(date)
            }
            hora={true}
            dialogData={true}
            titulo="Data da emissão"
          />
        </div>
        <CampoTexto
          style={{ width: "33%" }}
          name="honorario_reguladora_seguradora"
          id="honorario_reguladora_seguradora"
          label="Honorário da reguladora"
          tipo="number"
          percent={true}
          value={honorario_reguladora_seguradora}
          onChange={(e) => setHonorario_reguladora_seguradora(e.target.value)}
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
          style={{ width: "33%" }}
          name="despesas_reguladora_reguladora_seguradora"
          id="despesas_reguladora_reguladora_seguradora"
          label="Despesas da reguladora"
          tipo="number"
          percent={true}
          value={despesas_reguladora_reguladora_seguradora}
          onChange={(e) =>
            setDespesas_reguladora_reguladora_seguradora(e.target.value)
          }
        />
        <CampoTexto
          style={{ width: "33%" }}
          name="despesas_sinistro_reguladora_seguradora"
          id="despesas_sinistro_reguladora_seguradora"
          label="Despesas do Sinistro"
          tipo="number"
          percent={true}
          value={despesas_sinistro_reguladora_seguradora}
          onChange={(e) =>
            setDespesas_sinistro_reguladora_seguradora(e.target.value)
          }
        />
        <CampoTexto
          style={{ width: "33%" }}
          name="total_geral_reguladora_seguradora"
          id="total_geral_reguladora_seguradora"
          label="Total Geral"
          tipo="number"
          percent={true}
          value={total_geral_reguladora_seguradora}
          onChange={(e) => setTotal_geral_reguladora_seguradora(e.target.value)}
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
        <div style={{ width: "34%" }}>
          <FiltroData
            dataInicial={data_pagamentos_reguladora_seguradora}
            onSelectDataInicial={(date) =>
              setData_pagamentos_reguladora_seguradora(date)
            }
            hora={true}
            dialogData={true}
            titulo="Data dos pagamentos"
          />
        </div>
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
          FISCAL E TRIBUTÁRIO
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
          name="irrf_fiscal_tributario"
          id="irrf_fiscal_tributario"
          label="IRRF"
          tipo="number"
          percent={true}
          value={irrf_fiscal_tributario}
          onChange={(e) => setIrrf_fiscal_tributario(e.target.value)}
        />
        <CampoTexto
          style={{ width: "33%" }}
          name="pis_fiscal_tributario"
          id="pis_fiscal_tributario"
          label="PIS"
          tipo="number"
          percent={true}
          value={pis_fiscal_tributario}
          onChange={(e) => setPis_fiscal_tributario(e.target.value)}
        />
        <CampoTexto
          style={{ width: "34%" }}
          name="cofins_fiscal_tributario"
          id="cofins_fiscal_tributario"
          label="COFINS"
          tipo="number"
          percent={true}
          value={cofins_fiscal_tributario}
          onChange={(e) => setCofins_fiscal_tributario(e.target.value)}
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
          style={{ width: "33%" }}
          name="csll_fiscal_tributario"
          id="csll_fiscal_tributario"
          label="CSLL"
          tipo="number"
          percent={true}
          value={csll_fiscal_tributario}
          onChange={(e) => setCsll_fiscal_tributario(e.target.value)}
        />
        <CampoTexto
          style={{ width: "33%" }}
          name="issqn_fiscal_tributario"
          id="issqn_fiscal_tributario"
          label="ISSQN"
          tipo="number"
          percent={true}
          value={issqn_fiscal_tributario}
          onChange={(e) => setIssqn_fiscal_tributario(e.target.value)}
        />
        <CampoTexto
          style={{ width: "34%" }}
          name="imposto_descontado_fiscal_tributario"
          id="imposto_descontado_fiscal_tributario"
          label="Imp. Desc. pela Cia."
          tipo="number"
          percent={true}
          value={imposto_descontado_fiscal_tributario}
          onChange={(e) =>
            setImposto_descontado_fiscal_tributario(e.target.value)
          }
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
          style={{ width: "33%" }}
          name="total_imposto_fiscal_tributario"
          id="total_imposto_fiscal_tributario"
          label="R$ Total de Imposto"
          tipo="number"
          percent={true}
          value={total_imposto_fiscal_tributario}
          onChange={(e) => setTotal_imposto_fiscal_tributario(e.target.value)}
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
          REGULADORA/COLABORADOR
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
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={nf_prestacao_servico_reguladora_colaborador}
                onChange={handleCheckboxChange}
                name="nf_prestacao_servico_reguladora_colaborador"
              />
            }
            label="NF Prest. serviço N"
          />
        </FormGroup>
        <div style={{ width: "33%" }}>
          <FiltroData
            dataInicial={data_emissao_reguladora_colaborador}
            onSelectDataInicial={(date) =>
              setData_emissao_reguladora_colaborador(date)
            }
            hora={true}
            dialogData={true}
            titulo="Data da emissão"
          />
        </div>
        <CampoTexto
          style={{ width: "34%" }}
          name="honorario_prestador_reguladora_colaborador"
          id="honorario_prestador_reguladora_colaborador"
          label="Honorário do Prestador"
          tipo="number"
          percent={true}
          value={honorario_prestador_reguladora_colaborador}
          onChange={(e) =>
            setHonorario_prestador_reguladora_colaborador(e.target.value)
          }
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
          style={{ width: "33%" }}
          name="despesas_prestador_reguladora_colaborador"
          id="despesas_prestador_reguladora_colaborador"
          label="Despesas do prestador"
          tipo="number"
          percent={true}
          value={despesas_prestador_reguladora_colaborador}
          onChange={(e) =>
            setDespesas_prestador_reguladora_colaborador(e.target.value)
          }
        />
        <CampoTexto
          style={{ width: "33%" }}
          name="total_geral_reguladora_colaborador"
          id="total_geral_reguladora_colaborador"
          label="Total Geral"
          tipo="number"
          percent={true}
          value={total_geral_reguladora_colaborador}
          onChange={(e) =>
            setTotal_geral_reguladora_colaborador(e.target.value)
          }
        />
        <div style={{ width: "34%" }}>
          <FiltroData
            dataInicial={data_pagamento_reguladora_colaborador}
            onSelectDataInicial={(date) =>
              setData_pagamento_reguladora_colaborador(date)
            }
            hora={true}
            dialogData={true}
            titulo="Data dos pagamentos"
          />
        </div>
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
          RESULTADO FINANCEIRO
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
          name="cobranca_resultado_financeiro"
          id="cobranca_resultado_financeiro"
          label="COBRANÇA (Total Geral (-) Desp. do Sinistro)"
          tipo="number"
          percent={true}
          value={cobranca_resultado_financeiro}
          onChange={(e) => setCobranca_resultado_financeiro(e.target.value)}
        />
        <CampoTexto
          style={{ width: "33%" }}
          name="impoosto_premium_resultado_financeiro"
          id="impoosto_premium_resultado_financeiro"
          label="Imposto (Premium)"
          tipo="number"
          percent={true}
          value={impoosto_premium_resultado_financeiro}
          onChange={(e) =>
            setImpoosto_premium_resultado_financeiro(e.target.value)
          }
        />
        <CampoTexto
          style={{ width: "34%" }}
          name="colaborador_resultado_financeiro"
          id="colaborador_resultado_financeiro"
          label="Colaborador"
          tipo="number"
          percent={true}
          value={colaborador_resultado_financeiro}
          onChange={(e) => setColaborador_resultado_financeiro(e.target.value)}
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
          style={{ width: "34%" }}
          name="saldo_resultado_financeiro"
          id="saldo_resultado_financeiro"
          label="Saldo"
          tipo="number"
          percent={true}
          value={saldo_resultado_financeiro}
          onChange={(e) => setSaldo_resultado_financeiro(e.target.value)}
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
            atualizaFinanceiro();
          }}
          variant="contained"
          color="primary"
        >
          {atualizando ? <CircularProgress /> : "Finalizar"}
        </Button>
      </div>
    </div>
  );
};

export default StepFinanceiro;
