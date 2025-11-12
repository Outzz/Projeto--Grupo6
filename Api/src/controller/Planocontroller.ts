import { app } from "../server";
import { PlanoService } from "../service/PlanoService";
import { Plano, TipoPlano } from "../model/Plano";

export function PlanoController() {
  const service = new PlanoService();

  app.get("/api/planos/tipos", (req, res) => {
    const planosDisponiveis = Plano.listarTodosPlanos();
    res.json(planosDisponiveis);
  });

  app.get("/planos", (req, res) => {
    const planos = service.listarPlanos();
    const planosFormatados = planos.map((plano) => ({
      id: plano.getId(),
      clienteNome: plano.getClienteNome(),
      clienteEmail: plano.getClienteEmail(),
      clienteTelefone: plano.getClienteTelefone(),
      tipoPlano: plano.getTipoPlano(),
      precoMensal: plano.getPrecoMensal(),
      dataInicio: plano.getDataInicio(),
      ativo: plano.getAtivo(),
    }));
    res.json(planosFormatados);
  });

  app.post("/planos", (req, res) => {
    const dadosPlano = req.body;
    const novoPlano = service.criarPlano(dadosPlano);
    res.status(201).json({
      status: "Plano criado com sucesso",
      id: novoPlano.getId(),
      cliente: novoPlano.getClienteNome(),
      plano: novoPlano.getTipoPlano(),
      preco: novoPlano.getPrecoMensal(),
    });
  });

  app.get("/planos/:id", (req, res) => {
    const { id } = req.params;
    const plano = service.buscarPlanoPorId(id);
    res.json({
      id: plano.getId(),
      clienteNome: plano.getClienteNome(),
      clienteEmail: plano.getClienteEmail(),
      clienteTelefone: plano.getClienteTelefone(),
      tipoPlano: plano.getTipoPlano(),
      precoMensal: plano.getPrecoMensal(),
      dataInicio: plano.getDataInicio(),
      ativo: plano.getAtivo(),
    });
  });

  app.put("/planos/:id", (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    const planoAtualizado = service.editarPlano(id, dados);
    res.json({
      status: "Plano atualizado com sucesso",
      dados: {
        id: planoAtualizado.getId(),
        clienteNome: planoAtualizado.getClienteNome(),
        clienteEmail: planoAtualizado.getClienteEmail(),
        clienteTelefone: planoAtualizado.getClienteTelefone(),
        tipoPlano: planoAtualizado.getTipoPlano(),
        precoMensal: planoAtualizado.getPrecoMensal(),
        ativo: planoAtualizado.getAtivo(),
      },
    });
  });

  app.post("/planos/:id/cancelar", (req, res) => {
    const { id } = req.params;
    const plano = service.cancelarPlano(id);
    res.json({
      status: "Plano cancelado com sucesso",
      id: plano.getId(),
      cliente: plano.getClienteNome(),
      ativo: plano.getAtivo(),
    });
  });

  app.post("/planos/:id/reativar", (req, res) => {
    const { id } = req.params;
    const plano = service.reativarPlano(id);
    res.json({
      status: "Plano reativado com sucesso",
      id: plano.getId(),
      cliente: plano.getClienteNome(),
      ativo: plano.getAtivo(),
    });
  });

  app.get("/planos/buscar", (req, res) => {
    const { nome, tipo, status } = req.query;

    // Filtro por nome do cliente
    if (nome) {
      const planos = service.filtrarPlanosPorNome(nome as string);
      const planosFormatados = planos.map((plano) => ({
        id: plano.getId(),
        clienteNome: plano.getClienteNome(),
        clienteEmail: plano.getClienteEmail(),
        clienteTelefone: plano.getClienteTelefone(),
        tipoPlano: plano.getTipoPlano(),
        precoMensal: plano.getPrecoMensal(),
        ativo: plano.getAtivo(),
      }));
      return res.status(200).json(planosFormatados);
    }

    // Filtro por tipo de plano
    if (tipo) {
      const planos = service.filtrarPlanosPorTipo(tipo as any);
      const planosFormatados = planos.map((plano) => ({
        id: plano.getId(),
        clienteNome: plano.getClienteNome(),
        clienteEmail: plano.getClienteEmail(),
        clienteTelefone: plano.getClienteTelefone(),
        tipoPlano: plano.getTipoPlano(),
        precoMensal: plano.getPrecoMensal(),
        ativo: plano.getAtivo(),
      }));
      return res.status(200).json(planosFormatados);
    }

    // Filtro por status (ativo/inativo)
    if (status === "ativo") {
      const planos = service.filtrarPlanosAtivos();
      const planosFormatados = planos.map((plano) => ({
        id: plano.getId(),
        clienteNome: plano.getClienteNome(),
        clienteEmail: plano.getClienteEmail(),
        clienteTelefone: plano.getClienteTelefone(),
        tipoPlano: plano.getTipoPlano(),
        precoMensal: plano.getPrecoMensal(),
        ativo: plano.getAtivo(),
      }));
      return res.status(200).json(planosFormatados);
    }

    if (status === "inativo") {
      const planos = service.filtrarPlanosInativos();
      const planosFormatados = planos.map((plano) => ({
        id: plano.getId(),
        clienteNome: plano.getClienteNome(),
        clienteEmail: plano.getClienteEmail(),
        clienteTelefone: plano.getClienteTelefone(),
        tipoPlano: plano.getTipoPlano(),
        precoMensal: plano.getPrecoMensal(),
        ativo: plano.getAtivo(),
      }));
      return res.status(200).json(planosFormatados);
    }

    return res.status(400).json({
      mensagem:
        "Parâmetros de busca inválidos. Use: nome, tipo, ou status (ativo/inativo)",
    });
  });
}
