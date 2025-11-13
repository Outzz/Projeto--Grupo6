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
    if (!responsavel) {
      throw new Error("Responsável é obrigatório");
    }
    if (!observacoes || observacoes.length < 5) {
      throw new Error("Observações devem ter pelo menos 5 caracteres");
    }
  }

  static create(
    data: Date,
    tipo: TipoInteracao,
    responsavel: string,
    observacoes: string
  ): Interacao {
    const id = crypto.randomUUID();
    return new Interacao(id, data, tipo, responsavel, observacoes);
  }

  // Métodos de negócio
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

  tempoDesdeInteracao(): number {
    const hoje = new Date();
    const diff = hoje.getTime() - this.data.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)); // dias
  }

  // Getters
  getId(): string { return this.id; }
  getData(): Date { return this.data; }
  getTipo(): TipoInteracao { return this.tipo; }
  getResponsavel(): string { return this.responsavel; }
  getObservacoes(): string { return this.observacoes; }
  getResposta(): string { return this.resposta; }
  getStatus(): StatusInteracao { return this.status; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }

  // Setters
  setData(data: Date): void {
    this.data = data;
    this.updatedAt = new Date();
  }

  setTipo(tipo: TipoInteracao): void {
    this.tipo = tipo;
    this.updatedAt = new Date();
  }

  setResponsavel(responsavel: string): void {
    if (!responsavel) {
      throw new Error("Responsável é obrigatório");
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
    this.updatedAt = new Date();
  }

  setStatus(status: StatusInteracao): void {
    this.status = status;
    this.updatedAt = new Date();
  }
}