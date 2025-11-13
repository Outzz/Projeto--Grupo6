export type Prioridade = 'baixa' | 'media' | 'alta';
export type StatusTarefa = 'pendente' | 'em_andamento' | 'concluida';

export class Tarefa {
  constructor(
    private id: string,
    private descricao: string,
    private responsavel: string,
    private prazo: Date,
    private prioridade: Prioridade,
    private status: StatusTarefa = 'pendente',
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date()
  ) {
    if (!descricao || descricao.length < 3) {
      throw new Error("Descrição deve ter pelo menos 3 caracteres");
    }
    if (!responsavel) {
      throw new Error("Responsável é obrigatório");
    }
    if (!prazo) {
      throw new Error("Prazo é obrigatório");
    }
    if (!prioridade) {
      throw new Error("Prioridade é obrigatória");
    }
  }

  static create(
    descricao: string,
    responsavel: string,
    prazo: Date,
    prioridade: Prioridade = 'media'
  ): Tarefa {
    const id = crypto.randomUUID();
    return new Tarefa(id, descricao, responsavel, prazo, prioridade);
  }

  // Métodos de negócio
  iniciar(): void {
    if (this.status === 'concluida') {
      throw new Error("Não é possível iniciar uma tarefa concluída");
    }
    if (this.status === 'em_andamento') {
      throw new Error("Tarefa já está em andamento");
    }
    this.status = 'em_andamento';
    this.updatedAt = new Date();
  }

  concluir(): void {
    if (this.status === 'concluida') {
      throw new Error("Tarefa já está concluída");
    }
    this.status = 'concluida';
    this.updatedAt = new Date();
  }

  reabrir(): void {
    if (this.status === 'pendente') {
      throw new Error("Tarefa já está pendente");
    }
    this.status = 'pendente';
    this.updatedAt = new Date();
  }

  estáAtrasada(): boolean {
    const hoje = new Date();
    return this.prazo < hoje && this.status !== 'concluida';
  }

  diasRestantes(): number {
    const hoje = new Date();
    const diff = this.prazo.getTime() - hoje.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  isPendente(): boolean {
    return this.status === 'pendente';
  }

  isEmAndamento(): boolean {
    return this.status === 'em_andamento';
  }

  isConcluida(): boolean {
    return this.status === 'concluida';
  }

  isPrioridadeAlta(): boolean {
    return this.prioridade === 'alta';
  }

  isPrioridadeMedia(): boolean {
    return this.prioridade === 'media';
  }

  isPrioridadeBaixa(): boolean {
    return this.prioridade === 'baixa';
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getDescricao(): string {
    return this.descricao;
  }

  getResponsavel(): string {
    return this.responsavel;
  }

  getPrazo(): Date {
    return this.prazo;
  }

  getPrioridade(): Prioridade {
    return this.prioridade;
  }

  getStatus(): StatusTarefa {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Setters
  setDescricao(descricao: string): void {
    if (!descricao || descricao.length < 3) {
      throw new Error("Descrição deve ter pelo menos 3 caracteres");
    }
    this.descricao = descricao;
    this.updatedAt = new Date();
  }

  setResponsavel(responsavel: string): void {
    if (!responsavel) {
      throw new Error("Responsável é obrigatório");
    }
    this.responsavel = responsavel;
    this.updatedAt = new Date();
  }

  setPrazo(prazo: Date): void {
    if (!prazo) {
      throw new Error("Prazo é obrigatório");
    }
    this.prazo = prazo;
    this.updatedAt = new Date();
  }

  setPrioridade(prioridade: Prioridade): void {
    if (!prioridade) {
      throw new Error("Prioridade é obrigatória");
    }
    this.prioridade = prioridade;
    this.updatedAt = new Date();
  }

  setStatus(status: StatusTarefa): void {
    this.status = status;
    this.updatedAt = new Date();
  }

  // Métodos de formatação
  getPrazoFormatado(): string {
    return this.prazo.toLocaleDateString('pt-BR');
  }

  getPrioridadeFormatada(): string {
    const prioridades: Record<Prioridade, string> = {
      'baixa': 'Baixa',
      'media': 'Média',
      'alta': 'Alta',
    };
    return prioridades[this.prioridade];
  }

  getStatusFormatado(): string {
    const status: Record<StatusTarefa, string> = {
      'pendente': 'Pendente',
      'em_andamento': 'Em Andamento',
      'concluida': 'Concluída',
    };
    return status[this.status];
  }

  getResumo(): string {
    return `${this.descricao} - ${this.responsavel} - ${this.getPrazoFormatado()} - ${this.getStatusFormatado()}`;
  }
}