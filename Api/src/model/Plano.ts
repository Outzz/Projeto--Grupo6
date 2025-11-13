import { Plano } from "./Plano";

export class PlanoService {
  lista: Plano[] = [];

  criarPlano(plano: {
    clienteNome: string;
    clienteEmail: string;
    clienteTelefone: string;
    duracaoMeses: number;
  }): Plano {
    const planoCreated = Plano.create(
      plano.clienteNome,
      plano.clienteEmail,
      plano.clienteTelefone,
      plano.tipoPlano,
      plano.duracaoMeses
    );
    this.lista.push(planoCreated);
    return planoCreated;
  }

  editarPlano(
    id: string,
    dados: {
      clienteNome?: string;
      clienteEmail?: string;
      clienteTelefone?: string;
      duracaoMeses?: number;
      ativo?: boolean;
    }
  ): Plano {
    const plano = this.buscarPlanoPorId(id);
    if (!plano) {
      throw new Error("Plano não encontrado");
    }

    if (dados.clienteNome) plano.setClienteNome(dados.clienteNome);
    if (dados.clienteEmail) plano.setClienteEmail(dados.clienteEmail);
    if (dados.clienteTelefone) plano.setClienteTelefone(dados.clienteTelefone);
    if (dados.duracaoMeses !== undefined) plano.setDuracaoMeses(dados.duracaoMeses);
    if (dados.ativo !== undefined) plano.setAtivo(dados.ativo);

    return plano;
  }

  listarPlanos(): Plano[] {
    return this.lista;
  }

  buscarPlanoPorId(id: string): Plano {
    const plano = this.lista.find((plano) => plano.getId() === id);
    if (!plano) {
      throw new Error("Plano não encontrado");
    }
    return plano;
  }

  // NOVO: Deletar plano
  deletarPlano(id: string): void {
    const index = this.lista.findIndex((p) => p.getId() === id);
    if (index === -1) {
      throw new Error("Plano não encontrado");
    }
    this.lista.splice(index, 1);
  }

  buscarPlanoPorClienteNome(clienteNome: string): Plano | undefined {
    return this.lista.find((plano) => plano.getClienteNome() === clienteNome);
  }

  buscarPlanoPorClienteEmail(clienteEmail: string): Plano | undefined {
    return this.lista.find((plano) => plano.getClienteEmail() === clienteEmail);
  }

  // Métodos de negócio
  cancelarPlano(id: string): Plano {
    const plano = this.buscarPlanoPorId(id);
    plano.setAtivo(false);
    return plano;
  }

  reativarPlano(id: string): Plano {
    const plano = this.buscarPlanoPorId(id);
    plano.setAtivo(true);
    return plano;
  }

  filtrarPlanosAtivos(): Plano[] {
    return this.lista.filter((plano) => plano.getAtivo() === true);
  }

  filtrarPlanosInativos(): Plano[] {
    return this.lista.filter((plano) => plano.getAtivo() === false);
  }

  filtrarPlanosPorDuracao(duracaoMeses: number): Plano[] {
    return this.lista.filter((plano) => plano.getDuracaoMeses() === duracaoMeses);
  }

  filtrarPlanosPorNome(clienteNome: string): Plano[] {
    return this.lista.filter((plano) =>
      plano.getClienteNome().toLowerCase().includes(clienteNome.toLowerCase())
    );
  }
}