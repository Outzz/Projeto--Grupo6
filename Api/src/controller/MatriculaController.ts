import { app } from "../server";
import { MatriculaService } from "../service/MatriculaService";

export function MatriculaController() {
  const service = new MatriculaService();

  app.get("/matriculas", (req, res) => {
    const matriculas = service.listarMatriculas();
    const matriculasFormatadas = matriculas.map((m) => ({
      id: m.getId(),
      alunoId: m.getAlunoId(),
      planoId: m.getPlanoId(),
      dataInicio: m.getDataInicio(),
      dataFim: m.getDataFim(),
      valorPago: m.getValorPago(),
      formaPagamento: m.getFormaPagamento(),
      status: m.getStatus(),
      diasRestantes: m.diasRestantes(),
    }));
    res.json(matriculasFormatadas);
  });

  app.post("/matriculas", (req, res) => {
    try {
      const dadosMatricula = req.body;
      
      if (typeof dadosMatricula.dataInicio === 'string') {
        dadosMatricula.dataInicio = new Date(dadosMatricula.dataInicio);
      }
      
      const novaMatricula = service.criarMatricula(dadosMatricula);
      res.status(201).json({
        status: "Matrícula criada com sucesso",
        id: novaMatricula.getId(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });

  app.get("/matriculas/:id", (req, res) => {
    const { id } = req.params;
    const matricula = service.buscarMatriculaPorId(id);
    res.json({
      id: matricula.getId(),
      alunoId: matricula.getAlunoId(),
      planoId: matricula.getPlanoId(),
      dataInicio: matricula.getDataInicio(),
      dataFim: matricula.getDataFim(),
      valorPago: matricula.getValorPago(),
      formaPagamento: matricula.getFormaPagamento(),
      status: matricula.getStatus(),
      diasRestantes: matricula.diasRestantes(),
    });
  });

  app.post("/matriculas/:id/cancelar", (req, res) => {
    const { id } = req.params;
    const matricula = service.cancelarMatricula(id);
    res.json({
      status: "Matrícula cancelada com sucesso",
      id: matricula.getId(),
      statusAtual: matricula.getStatus(),
    });
  });

  app.post("/matriculas/verificar-vencimentos", (req, res) => {
    service.verificarVencimentos();
    res.json({
      status: "Verificação de vencimentos realizada com sucesso",
    });
  });

  app.get("/matriculas/relatorios/receita", (req, res) => {
    const receita = service.calcularReceita();
    res.json({
      receitaTotal: receita,
      matriculasAtivas: service.filtrarMatriculasPorStatus('ativa').length,
    });
  });

  app.get("/matriculas/relatorios/receita-periodo", (req, res) => {
    const { dataInicio, dataFim } = req.query;
    
    if (!dataInicio || !dataFim) {
      return res.status(400).json({ 
        erro: "dataInicio e dataFim são obrigatórios" 
      });
    }

    const inicio = new Date(dataInicio as string);
    const fim = new Date(dataFim as string);
    
    const receita = service.calcularReceitaPorPeriodo(inicio, fim);
    
    res.json({
      periodo: {
        dataInicio: inicio,
        dataFim: fim,
      },
      receita: receita,
    });
  });

  app.get("/matriculas/buscar", (req, res) => {
    const { alunoId, planoId, status, formaPagamento, vencendoEm } = req.query;

    // Filtro por aluno
    if (alunoId) {
      const matriculas = service.buscarMatriculasPorAluno(alunoId as string);
      const matriculasFormatadas = matriculas.map((m) => ({
        id: m.getId(),
        alunoId: m.getAlunoId(),
        planoId: m.getPlanoId(),
        dataInicio: m.getDataInicio(),
        dataFim: m.getDataFim(),
        valorPago: m.getValorPago(),
        formaPagamento: m.getFormaPagamento(),
        status: m.getStatus(),
        diasRestantes: m.diasRestantes(),
      }));
      return res.status(200).json(matriculasFormatadas);
    }

    // Filtro por plano
    if (planoId) {
      const matriculas = service.buscarMatriculasPorPlano(planoId as string);
      const matriculasFormatadas = matriculas.map((m) => ({
        id: m.getId(),
        alunoId: m.getAlunoId(),
        planoId: m.getPlanoId(),
        dataInicio: m.getDataInicio(),
        dataFim: m.getDataFim(),
        valorPago: m.getValorPago(),
        formaPagamento: m.getFormaPagamento(),
        status: m.getStatus(),
        diasRestantes: m.diasRestantes(),
      }));
      return res.status(200).json(matriculasFormatadas);
    }

    // Filtro por status
    if (status && (status === 'ativa' || status === 'vencida' || status === 'cancelada')) {
      const matriculas = service.filtrarMatriculasPorStatus(status);
      const matriculasFormatadas = matriculas.map((m) => ({
        id: m.getId(),
        alunoId: m.getAlunoId(),
        planoId: m.getPlanoId(),
        dataInicio: m.getDataInicio(),
        dataFim: m.getDataFim(),
        valorPago: m.getValorPago(),
        formaPagamento: m.getFormaPagamento(),
        status: m.getStatus(),
        diasRestantes: m.diasRestantes(),
      }));
      return res.status(200).json(matriculasFormatadas);
    }

    // Filtro por forma de pagamento
    if (formaPagamento) {
      const matriculas = service.filtrarMatriculasPorFormaPagamento(formaPagamento as string);
      const matriculasFormatadas = matriculas.map((m) => ({
        id: m.getId(),
        alunoId: m.getAlunoId(),
        planoId: m.getPlanoId(),
        dataInicio: m.getDataInicio(),
        dataFim: m.getDataFim(),
        valorPago: m.getValorPago(),
        formaPagamento: m.getFormaPagamento(),
        status: m.getStatus(),
        diasRestantes: m.diasRestantes(),
      }));
      return res.status(200).json(matriculasFormatadas);
    }

    // Filtro por dias para vencer
    if (vencendoEm) {
      const dias = parseInt(vencendoEm as string);
      const matriculas = service.filtrarMatriculasVencendoEm(dias);
      const matriculasFormatadas = matriculas.map((m) => ({
        id: m.getId(),
        alunoId: m.getAlunoId(),
        planoId: m.getPlanoId(),
        dataInicio: m.getDataInicio(),
        dataFim: m.getDataFim(),
        valorPago: m.getValorPago(),
        formaPagamento: m.getFormaPagamento(),
        status: m.getStatus(),
        diasRestantes: m.diasRestantes(),
      }));
      return res.status(200).json(matriculasFormatadas);
    }

    return res.status(400).json({
      mensagem: "Parâmetros de busca inválidos. Use: alunoId, planoId, status, formaPagamento, ou vencendoEm",
    });
  });
}