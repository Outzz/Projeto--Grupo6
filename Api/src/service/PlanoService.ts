import { Plano, TipoPlano } from "../model/Plano";

export class PlanoService {
  lista: Plano[] = [];

  criarPlano(plano: {
    clienteNome: string;
    clienteEmail: string;
    clienteTelefone: string;
    tipoPlano: TipoPlano;
    duracaoMeses: number;
  }): Plano {
    // Verifica se já existe plano ativo para este email
    const planoExistente = this.lista.find(
      (p) => p.getClienteEmail() === plano.clienteEmail && p.getAtivo()
    );
    
    if (planoExistente) {
      throw new Error("Já existe um plano ativo para este email");
    }

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
      tipoPlano?: TipoPlano;
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
    if (dados.tipoPlano) plano.setTipoPlano(dados.tipoPlano);
    if (dados.duracaoMeses !== undefined) plano.setDuracaoMeses(dados.duracaoMeses);
    if (dados.ativo !== undefined) plano.setAtivo(dados.ativo);

    return plano;
  }

  listarPlanos(): Plano[] {
    return this.lista;
  }

  buscarPlanoPorId(id: string): Plano | undefined {
    return this.lista.find((plano) => plano.getId() === id);
  }

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
    if (!plano) {
      throw new Error("Plano não encontrado");
    }
    plano.desativar();
    return plano;
  }

  reativarPlano(id: string): Plano {
    const plano = this.buscarPlanoPorId(id);
    if (!plano) {
      throw new Error("Plano não encontrado");
    }
    plano.ativar();
    return plano;
  }

  // Métodos de filtro
  filtrarPlanosAtivos(): Plano[] {
    return this.lista.filter((plano) => plano.getAtivo() === true);
  }

  filtrarPlanosInativos(): Plano[] {
    return this.lista.filter((plano) => plano.getAtivo() === false);
  }

  filtrarPlanosPorTipo(tipoPlano: TipoPlano): Plano[] {
    return this.lista.filter((plano) => plano.getTipoPlano() === tipoPlano);
  }

  filtrarPlanosPorDuracao(duracaoMeses: number): Plano[] {
    return this.lista.filter((plano) => plano.getDuracaoMeses() === duracaoMeses);
  }

  filtrarPlanosPorNome(clienteNome: string): Plano[] {
    return this.lista.filter((plano) =>
      plano.getClienteNome().toLowerCase().includes(clienteNome.toLowerCase())
    );
  }

  filtrarPlanosPorEmail(clienteEmail: string): Plano[] {
    return this.lista.filter((plano) =>
      plano.getClienteEmail().toLowerCase().includes(clienteEmail.toLowerCase())
    );
  }

  filtrarPlanosPorFaixaDuracao(duracaoMin: number, duracaoMax: number): Plano[] {
    return this.lista.filter((plano) => {
      const duracao = plano.getDuracaoMeses();
      return duracao >= duracaoMin && duracao <= duracaoMax;
    });
  }

  // Métodos de estatísticas
  contarPlanosPorTipo(tipoPlano: TipoPlano): number {
    return this.filtrarPlanosPorTipo(tipoPlano).length;
  }

  contarPlanosAtivos(): number {
    return this.filtrarPlanosAtivos().length;
  }

  contarPlanosInativos(): number {
    return this.filtrarPlanosInativos().length;
  }

  calcularReceitaTotalAtivos(): number {
    return this.filtrarPlanosAtivos()
      .reduce((total, plano) => total + plano.calcularValorComDesconto(), 0);
  }

  calcularReceitaTotalPorTipo(tipoPlano: TipoPlano): number {
    return this.filtrarPlanosPorTipo(tipoPlano)
      .filter((p) => p.getAtivo())
      .reduce((total, plano) => total + plano.calcularValorComDesconto(), 0);
  }

  calcularMediaValorPlanos(): number {
    const planosAtivos = this.filtrarPlanosAtivos();
    if (planosAtivos.length === 0) return 0;
    
    const total = planosAtivos.reduce(
      (sum, plano) => sum + plano.calcularValorComDesconto(),
      0
    );
    return total / planosAtivos.length;
  }

  obterPlanosRecentes(quantidade: number = 10): Plano[] {
    return [...this.lista]
      .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime())
      .slice(0, quantidade);
  }

  // Métodos de agrupamento
  agruparPlanosPorTipo(): Map<TipoPlano, Plano[]> {
    const grupos = new Map<TipoPlano, Plano[]>();
    
    this.lista.forEach((plano) => {
      const tipo = plano.getTipoPlano();
      if (!grupos.has(tipo)) {
        grupos.set(tipo, []);
      }
      grupos.get(tipo)!.push(plano);
    });
    
    return grupos;
  }

  agruparPlanosPorDuracao(): Map<number, Plano[]> {
    const grupos = new Map<number, Plano[]>();
    
    this.lista.forEach((plano) => {
      const duracao = plano.getDuracaoMeses();
      if (!grupos.has(duracao)) {
        grupos.set(duracao, []);
      }
      grupos.get(duracao)!.push(plano);
    });
    
    return grupos;
  }

  // Métodos de relatório
  obterEstatisticas(): {
    total: number;
    ativos: number;
    inativos: number;
    porTipo: Record<TipoPlano, number>;
    receitaTotal: number;
    receitaMedia: number;
  } {
    return {
      total: this.lista.length,
      ativos: this.contarPlanosAtivos(),
      inativos: this.contarPlanosInativos(),
      porTipo: {
        basico: this.contarPlanosPorTipo('basico'),
        intermediario: this.contarPlanosPorTipo('intermediario'),
        avancado: this.contarPlanosPorTipo('avancado'),
        premium: this.contarPlanosPorTipo('premium'),
      },
      receitaTotal: this.calcularReceitaTotalAtivos(),
      receitaMedia: this.calcularMediaValorPlanos(),
    };
  }

  obterPlanosVencendoEm(dias: number): Plano[] {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + dias);
    
    return this.filtrarPlanosAtivos().filter((plano) => {
      // Aqui você pode adicionar lógica de data de vencimento se necessário
      // Por enquanto, retorna planos que exigem atenção
      return plano.getDuracaoMeses() <= 1;
    });
  }

  buscarPlanosComDesconto(): Plano[] {
    return this.lista.filter((plano) => plano.calcularDesconto() > 0);
  }
}