export type TipoInteracao = 'ligacao' | 'email' | 'reuniao' | 'visita' | 'suporte';
export type StatusInteracao = 'pendente' | 'respondido';

export class Interacao {
  constructor(
    private id: string,
    private data: Date,
    private tipo: TipoInteracao,
    private responsavel: string,
    private observacoes: string,
    private resposta: string = '',
    private status: StatusInteracao = 'pendente',
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date()
  ) {
    if (!data) throw new Error("data obrigatória");
    if (!tipo) throw new Error("tipo obrigatório");
    if (!responsavel) throw new Error("responsável obrigatório");
    if (!observacoes || observacoes.length < 5) throw new Error("observações devem ter pelo menos 5 caracteres");
    if (responsavel.length < 3) throw new Error("nome do responsável muito curto");
    if (!this.validarTipo(tipo)) throw new Error("tipo de interação inválido");
  }

  static create(
    data: Date,
    tipo: TipoInteracao,
    responsavel: string,
    observacoes: string
  ) {
    const id = crypto.randomUUID();
    return new Interacao(id, data, tipo, responsavel, observacoes);
  }

  private validarTipo(tipo: string): boolean {
    const tiposValidos: TipoInteracao[] = ['ligacao', 'email', 'reuniao', 'visita', 'suporte'];
    return tiposValidos.includes(tipo as TipoInteracao);
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getData(): Date {
    return this.data;
  }

  getTipo(): TipoInteracao {
    return this.tipo;
  }

  getResponsavel(): string {
    return this.responsavel;
  }

  getObservacoes(): string {
    return this.observacoes;
  }

  getResposta(): string {
    return this.resposta;
  }

  getStatus(): StatusInteracao {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Setters
  setData(data: Date): void {
    if (!data) {
      throw new Error("Data obrigatória");
    }
    this.data = data;
    this.updatedAt = new Date();
  }

  setTipo(tipo: TipoInteracao): void {
    if (!this.validarTipo(tipo)) {
      throw new Error("Tipo de interação inválido");
    }
    this.tipo = tipo;
    this.updatedAt = new Date();
  }

  setResponsavel(responsavel: string): void {
    if (!responsavel || responsavel.length < 3) {
      throw new Error("Nome do responsável inválido");
    }
    this.responsavel = responsavel;
    this.updatedAt = new Date();
  }

  setObservacoes(observacoes: string): void {
    if (!observacoes || observacoes.length < 5) {
      throw new Error("Observações devem ter pelo menos 5 caracteres");
    }
    this.observacoes = observacoes;
    this.updatedAt = new Date();
  }

  setResposta(resposta: string): void {
    this.resposta = resposta;
    if (resposta && resposta.trim() !== '') {
      this.status = 'respondido';
    }
    this.updatedAt = new Date();
  }

  setStatus(status: StatusInteracao): void {
    this.status = status;
    this.updatedAt = new Date();
  }

  // Métodos auxiliares
  responder(resposta: string): void {
    if (!resposta || resposta.length < 5) {
      throw new Error("Resposta deve ter pelo menos 5 caracteres");
    }
    if (this.status === 'respondido') {
      throw new Error("Interação já foi respondida");
    }
    this.resposta = resposta;
    this.status = 'respondido';
    this.updatedAt = new Date();
  }

  reabrir(): void {
    if (this.status === 'pendente') {
      throw new Error("Interação já está pendente");
    }
    this.status = 'pendente';
    this.resposta = '';
    this.updatedAt = new Date();
  }

  marcarComoPendente(): void {
    this.status = 'pendente';
    this.updatedAt = new Date();
  }

  marcarComoRespondido(): void {
    this.status = 'respondido';
    this.updatedAt = new Date();
  }

  isPendente(): boolean {
    return this.status === 'pendente';
  }

  isRespondido(): boolean {
    return this.status === 'respondido';
  }

  temResposta(): boolean {
    return this.resposta !== null && this.resposta.trim() !== '';
  }

  temObservacoes(): boolean {
    return this.observacoes !== null && this.observacoes.trim() !== '';
  }

  // Métodos de verificação de tipo
  isLigacao(): boolean {
    return this.tipo === 'ligacao';
  }

  isEmail(): boolean {
    return this.tipo === 'email';
  }

  isReuniao(): boolean {
    return this.tipo === 'reuniao';
  }

  isVisita(): boolean {
    return this.tipo === 'visita';
  }

  isSuporte(): boolean {
    return this.tipo === 'suporte';
  }

  // Métodos de cálculo
  tempoDesdeInteracao(): number {
    const hoje = new Date();
    const diff = hoje.getTime() - this.data.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)); // dias
  }

  // Métodos de formatação
  getDataFormatada(): string {
    return this.data.toLocaleDateString('pt-BR');
  }

  getDataHoraFormatada(): string {
    return this.data.toLocaleString('pt-BR');
  }

  getTipoFormatado(): string {
    const tiposFormatados: Record<TipoInteracao, string> = {
      ligacao: 'Ligação',
      email: 'E-mail',
      reuniao: 'Reunião',
      visita: 'Visita',
      suporte: 'Suporte',
    };
    return tiposFormatados[this.tipo];
  }

  getStatusFormatado(): string {
    return this.status === 'pendente' ? 'Pendente' : 'Respondido';
  }

  // Método para obter resumo da interação
  getResumo(): string {
    return `${this.getTipoFormatado()} - ${this.responsavel} - ${this.getDataFormatada()} - ${this.getStatusFormatado()}`;
  }
}