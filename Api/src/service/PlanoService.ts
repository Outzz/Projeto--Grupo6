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
    const plano = this.lista.find((plano) => plano.getId() === id);
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

  buscarPlanoPorClienteNome(clienteNome: string): Plano | undefined {
    return this.lista.find((plano) => plano.getClienteNome() === clienteNome);
  }

  buscarPlanoPorClienteEmail(clienteEmail: string): Plano | undefined {
    return this.lista.find((plano) => plano.getClienteEmail() === clienteEmail);
  }

  // Métodos de filtro que retornam listas
  filtrarPlanosPorTipo(tipoPlano: TipoPlano): Plano[] {
    return this.lista.filter((plano) => plano.getTipoPlano() === tipoPlano);
  }

  filtrarPlanosAtivos(ativo: boolean = true): Plano[] {
    return this.lista.filter((plano) => plano.getAtivo() === ativo);
  }

  filtrarPlanosPorDuracao(duracaoMeses: number): Plano[] {
    return this.lista.filter((plano) => plano.getDuracaoMeses() === duracaoMeses);
  }

  filtrarPlanosPorClienteNome(clienteNome: string): Plano[] {
    return this.lista.filter((plano) =>
      plano.getClienteNome().toLowerCase().includes(clienteNome.toLowerCase())
    );
  }
}
