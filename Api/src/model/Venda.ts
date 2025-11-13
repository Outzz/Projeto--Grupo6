export type StatusVenda = 'em_negociacao' | 'fechado' | 'perdido';

export class Venda {
  constructor(
    private id: string,
    private cliente: string,
    private produto: string,
    private valor: number,
    private status: StatusVenda,
    private responsavel: string,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date()
  ) {
    if (!cliente || cliente.length < 3) {
      throw new Error("Nome do cliente deve ter pelo menos 3 caracteres");
    }
    if (!produto || produto.length < 3) {
      throw new Error("Nome do produto deve ter pelo menos 3 caracteres");
    }
    if (!valor || valor <= 0) {
      throw new Error("Valor deve ser maior que zero");
    }
    if (!responsavel) {
      throw new Error("Responsável é obrigatório");
    }
  }

  static create(
    cliente: string,
    produto: string,
    valor: number,
    status: StatusVenda,
    responsavel: string
  ): Venda {
    const id = crypto.randomUUID();
    return new Venda(id, cliente, produto, valor, status, responsavel);
  }

  // Métodos de negócio
  fechar(): void {
    if (this.status === 'fechado') {
      throw new Error("Venda já está fechada");
    }
    if (this.status === 'perdido') {
      throw new Error("Não é possível fechar uma venda perdida");
    }
    this.status = 'fechado';
    this.updatedAt = new Date();
  }

  perder(): void {
    if (this.status === 'fechado') {
      throw new Error("Não é possível marcar como perdida uma venda fechada");
    }
    if (this.status === 'perdido') {
      throw new Error("Venda já está marcada como perdida");
    }
    this.status = 'perdido';
    this.updatedAt = new Date();
  }

  reabrir(): void {
    if (this.status === 'em_negociacao') {
      throw new Error("Venda já está em negociação");
    }
    this.status = 'em_negociacao';
    this.updatedAt = new Date();
  }

  calcularComissao(percentual: number): number {
    if (this.status !== 'fechado') {
      return 0;
    }
    return this.valor * (percentual / 100);
  }

  // Getters
  getId(): string { return this.id; }
  getCliente(): string { return this.cliente; }
  getProduto(): string { return this.produto; }
  getValor(): number { return this.valor; }
  getStatus(): StatusVenda { return this.status; }
  getResponsavel(): string { return this.responsavel; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }

  // Setters
  setCliente(cliente: string): void {
    if (!cliente || cliente.length < 3) {
      throw new Error("Nome do cliente deve ter pelo menos 3 caracteres");
    }
    this.cliente = cliente;
    this.updatedAt = new Date();
  }

  setProduto(produto: string): void {
    if (!produto || produto.length < 3) {
      throw new Error("Nome do produto deve ter pelo menos 3 caracteres");
    }
    this.produto = produto;
    this.updatedAt = new Date();
  }

  setValor(valor: number): void {
    if (!valor || valor <= 0) {
      throw new Error("Valor deve ser maior que zero");
    }
    this.valor = valor;
    this.updatedAt = new Date();
  }

  setStatus(status: StatusVenda): void {
    this.status = status;
    this.updatedAt = new Date();
  }

  setResponsavel(responsavel: string): void {
    if (!responsavel) {
      throw new Error("Responsável é obrigatório");
    }
    this.responsavel = responsavel;
    this.updatedAt = new Date();
  }
}