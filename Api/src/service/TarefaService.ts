import { Tarefa } from "../model/Tarefa";

export class TarefaService {
  lista: Tarefa[] = [];

  criarTarefa(tarefa: {
    descricao: string;
    responsavel?: string;
    prazo: string;
    prioridade?: 'baixa' | 'media' | 'alta';
    status?: 'pendente' | 'em_andamento' | 'concluida';
  }): Tarefa {
    const tarefaCreated = Tarefa.create(
      tarefa.descricao,
      tarefa.responsavel,
      tarefa.prazo,
      tarefa.prioridade,
      tarefa.status
    );
    this.lista.push(tarefaCreated);
    return tarefaCreated;
  }

  listarTarefas(): Tarefa[] {
    return this.lista;
  }

  buscarTarefaPorId(id: string): Tarefa {
    const tarefa = this.lista.find((t) => t.getId() === id);
    if (!tarefa) {
      throw new Error("Tarefa não encontrada");
    }
    return tarefa;
  }

  editarTarefa(
    id: string,
    dados: {
      descricao?: string;
      responsavel?: string;
      prazo?: string;
      prioridade?: 'baixa' | 'media' | 'alta';
      status?: 'pendente' | 'em_andamento' | 'concluida';
    }
  ): Tarefa {
    const tarefa = this.buscarTarefaPorId(id);
    
    if (dados.descricao) tarefa.setDescricao(dados.descricao);
    if (dados.responsavel !== undefined) tarefa.setResponsavel(dados.responsavel);
    if (dados.prazo) tarefa.setPrazo(dados.prazo);
    if (dados.prioridade) tarefa.setPrioridade(dados.prioridade);
    if (dados.status) tarefa.setStatus(dados.status);
    
    return tarefa;
  }

  deletarTarefa(id: string): void {
    const index = this.lista.findIndex((t) => t.getId() === id);
    if (index === -1) {
      throw new Error("Tarefa não encontrada");
    }
    this.lista.splice(index, 1);
  }

  filtrarTarefasPorStatus(status: 'pendente' | 'em_andamento' | 'concluida'): Tarefa[] {
    return this.lista.filter((t) => t.getStatus() === status);
  }

  filtrarTarefasPorPrioridade(prioridade: 'baixa' | 'media' | 'alta'): Tarefa[] {
    return this.lista.filter((t) => t.getPrioridade() === prioridade);
  }

  filtrarTarefasPorResponsavel(responsavel: string): Tarefa[] {
    return this.lista.filter((t) => t.getResponsavel() === responsavel);
  }

  filtrarTarefasVencendo(dias: number): Tarefa[] {
    const hoje = new Date();
    const dataLimite = new Date();
    dataLimite.setDate(hoje.getDate() + dias);

    return this.lista.filter((t) => {
      const prazo = new Date(t.getPrazo());
      return prazo >= hoje && prazo <= dataLimite && t.getStatus() !== 'concluida';
    });
  }
}