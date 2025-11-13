export type TipoPlano = 'basico' | 'intermediario' | 'avancado' | 'premium';

export class Plano {
  constructor(
    private id: string,
    private clienteNome: string,
    private clienteEmail: string,
    private clienteTelefone: string,
    private tipoPlano: TipoPlano,
    private duracaoMeses: number,
    private ativo: boolean = true,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date()
  ) {
    if (!clienteNome || clienteNome.length < 3) {
      throw new Error("Nome do cliente deve ter pelo menos 3 caracteres");
    }
    if (!clienteEmail || !this.validarEmail(clienteEmail)) {
      throw new Error("Email inválido");
    }
    if (!clienteTelefone || clienteTelefone.length < 10) {
      throw new Error("Telefone deve ter pelo menos 10 caracteres");
    }
    if (!duracaoMeses || duracaoMeses <= 0) {
      throw new Error("Duração deve ser maior que zero");
    }
  }

  private validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static create(
    clienteNome: string,
    clienteEmail: string,
    clienteTelefone: string,
    tipoPlano: TipoPlano,
    duracaoMeses: number
  ): Plano {
    const id = crypto.randomUUID();
    return new Plano(
      id,
      clienteNome,
      clienteEmail,
      clienteTelefone,
      tipoPlano,
      duracaoMeses
    );
  }

  // Métodos de negócio
  calcularValorMensal(): number {
    const valores: Record<TipoPlano, number> = {
      basico: 99.90,
      intermediario: 149.90,
      avancado: 249.90,
      premium: 399.90
    };
    return valores[this.tipoPlano];
  }

  calcularValorTotal(): number {
    return this.calcularValorMensal() * this.duracaoMeses;
  }

  calcularDesconto(): number {
    // Desconto progressivo baseado na duração
    if (this.duracaoMeses >= 12) return 20; // 20% para anual
    if (this.duracaoMeses >= 6) return 10;  // 10% para semestral
    if (this.duracaoMeses >= 3) return 5;   // 5% para trimestral
    return 0;
  }

  calcularValorComDesconto(): number {
    const valorTotal = this.calcularValorTotal();
    const desconto = this.calcularDesconto();
    return valorTotal - (valorTotal * desconto / 100);
  }

  ativar(): void {
    if (this.ativo) {
      throw new Error("Plano já está ativo");
    }
    this.ativo = true;
    this.updatedAt = new Date();
  }

  desativar(): void {
    if (!this.ativo) {
      throw new Error("Plano já está inativo");
    }
    this.ativo = false;
    this.updatedAt = new Date();
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

  getDuracaoMeses(): number {
    return this.duracaoMeses;
  }

  getAtivo(): boolean {
    return this.ativo;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Setters
  setClienteNome(clienteNome: string): void {
    if (!clienteNome || clienteNome.length < 3) {
      throw new Error("Nome do cliente deve ter pelo menos 3 caracteres");
    }
    this.clienteNome = clienteNome;
    this.updatedAt = new Date();
  }

  setClienteEmail(clienteEmail: string): void {
    if (!clienteEmail || !this.validarEmail(clienteEmail)) {
      throw new Error("Email inválido");
    }
    this.clienteEmail = clienteEmail;
    this.updatedAt = new Date();
  }

  setClienteTelefone(clienteTelefone: string): void {
    if (!clienteTelefone || clienteTelefone.length < 10) {
      throw new Error("Telefone deve ter pelo menos 10 caracteres");
    }
    this.clienteTelefone = clienteTelefone;
    this.updatedAt = new Date();
  }

  setTipoPlano(tipoPlano: TipoPlano): void {
    this.tipoPlano = tipoPlano;
    this.updatedAt = new Date();
  }

  setDuracaoMeses(duracaoMeses: number): void {
    if (!duracaoMeses || duracaoMeses <= 0) {
      throw new Error("Duração deve ser maior que zero");
    }
    this.duracaoMeses = duracaoMeses;
    this.updatedAt = new Date();
  }

  setAtivo(ativo: boolean): void {
    this.ativo = ativo;
    this.updatedAt = new Date();
  }
}