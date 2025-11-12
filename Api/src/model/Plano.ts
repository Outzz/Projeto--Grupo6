export type TipoPlano =
  | "musculacao"
  | "zumba"
  | "pilates"
  | "musculacao+pilates"
  | "zumba+pilates"
  | "musculacao+zumba";

export class Plano {
  private static precos: Record<TipoPlano, number> = {
    musculacao: 150,
    zumba: 120,
    pilates: 210,
    "musculacao+pilates": 350,
    "zumba+pilates": 299.99,
    "musculacao+zumba": 200,
  };

  constructor(
    private id: string,
    private clienteNome: string,
    private clienteEmail: string,
    private clienteTelefone: string,
    private tipoPlano: TipoPlano,
    private duracaoMeses: number,
    private dataInicio: Date,
    private ativo: boolean = true
  ) {
    if (!clienteNome) throw new Error("nome do cliente obrigatório");
    if (!clienteEmail) throw new Error("email do cliente obrigatório");
    if (!clienteTelefone) throw new Error("telefone do cliente obrigatório");
    if (!tipoPlano) throw new Error("tipo de plano obrigatório");
    if (clienteNome.length < 3) throw new Error("nome muito curto");
    if (!this.validarTipoPlano(tipoPlano))
      throw new Error("tipo de plano inválido");
  }

  static create(
    clienteNome: string,
    clienteEmail: string,
    clienteTelefone: string,
    tipoPlano: TipoPlano,
    duracaoMeses: number
  ) {
    const id = crypto.randomUUID();
    const dataInicio = new Date();
    return new Plano(
      id,
      clienteNome,
      clienteEmail,
      clienteTelefone,
      tipoPlano,
      duracaoMeses,
      dataInicio
    );
  }

  private validarTipoPlano(tipo: string): boolean {
    return tipo in Plano.precos;
  }

  static getPreco(tipoPlano: TipoPlano): number {
    return Plano.precos[tipoPlano];
  }

  static listarTodosPlanos(): { tipo: TipoPlano; preco: number }[] {
    return Object.entries(Plano.precos).map(([tipo, preco]) => ({
      tipo: tipo as TipoPlano,
      preco,
    }));
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getClienteNome(): string {
    return this.clienteNome;
  }

  getClienteEmail(): string {
    return this.clienteEmail;
  }

  getClienteTelefone(): string {
    return this.clienteTelefone;
  }

  getTipoPlano(): TipoPlano {
    return this.tipoPlano;
  }

  getDataInicio(): Date {
    return this.dataInicio;
  }

  getDuracaoMeses(): number {
    return this.duracaoMeses;
  }

  getAtivo(): boolean {
    return this.ativo;
  }

  getPrecoMensal(): number {
    return Plano.precos[this.tipoPlano];
  }

  // Setters
  setClienteNome(nome: string): void {
    this.clienteNome = nome;
  }

  setClienteEmail(email: string): void {
    this.clienteEmail = email;
  }

  setClienteTelefone(telefone: string): void {
    this.clienteTelefone = telefone;
  }

  setTipoPlano(tipoPlano: TipoPlano): void {
    this.tipoPlano = tipoPlano;
  }

  setDuracaoMeses(duracaoMeses: number): void {
    this.duracaoMeses = this.duracaoMeses;
  }

  setAtivo(ativo: boolean): void {
    this.ativo = ativo;
  }
}
