export class Matricula {
  constructor(
    private id: string,
    private alunoId: string,
    private planoId: string,
    private dataInicio: Date,
    private dataFim: Date,
    private valorPago: number,
    private formaPagamento: 'cartao_credito' | 'cartao_debito' | 'pix' | 'boleto',
    private status: 'ativa' | 'vencida' | 'cancelada' = 'ativa'
  ) {
    if (!alunoId) throw new Error("alunoId obrigatório");
    if (!planoId) throw new Error("planoId obrigatório");
    if (!valorPago || valorPago <= 0) throw new Error("valor deve ser maior que zero");
    if (!formaPagamento) throw new Error("forma de pagamento obrigatória");
  }

  static create(
    alunoId: string,
    planoId: string,
    dataInicio: Date,
    mesesDuracao: number,
    valorPago: number,
    formaPagamento: 'cartao_credito' | 'cartao_debito' | 'pix' | 'boleto'
  ) {
    const id = crypto.randomUUID();
    const dataFim = new Date(dataInicio);
    dataFim.setMonth(dataFim.getMonth() + mesesDuracao);
    
    return new Matricula(id, alunoId, planoId, dataInicio, dataFim, valorPago, formaPagamento);
  }

  cancelar(): void {
    this.status = 'cancelada';
  }

  verificarVencimento(): void {
    const hoje = new Date();
    if (this.dataFim < hoje && this.status === 'ativa') {
      this.status = 'vencida';
    }
  }

  diasRestantes(): number {
    const hoje = new Date();
    const diff = this.dataFim.getTime() - hoje.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  // Getters
  getId(): string { return this.id; }
  getAlunoId(): string { return this.alunoId; }
  getPlanoId(): string { return this.planoId; }
  getDataInicio(): Date { return this.dataInicio; }
  getDataFim(): Date { return this.dataFim; }
  getValorPago(): number { return this.valorPago; }
  getFormaPagamento(): string { return this.formaPagamento; }
  getStatus(): string { return this.status; }
}