import { Matricula } from "../model/Matricula";

export class MatriculaService {
  lista: Matricula[] = [];

  criarMatricula(matricula: {
    alunoId: string;
    planoId: string;
    dataInicio: Date;
    mesesDuracao: number;
    valorPago: number;
    formaPagamento: 'cartao_credito' | 'cartao_debito' | 'pix' | 'boleto';
  }): Matricula {
    const matriculaCreated = Matricula.create(
      matricula.alunoId,
      matricula.planoId,
      matricula.dataInicio,
      matricula.mesesDuracao,
      matricula.valorPago,
      matricula.formaPagamento
    );
    this.lista.push(matriculaCreated);
    return matriculaCreated;
  }

  listarMatriculas(): Matricula[] {
    return this.lista;
  }

  buscarMatriculaPorId(id: string): Matricula {
    const matricula = this.lista.find((m) => m.getId() === id);
    if (!matricula) {
      throw new Error("Matrícula não encontrada");
    }
    return matricula;
  }

  buscarMatriculasPorAluno(alunoId: string): Matricula[] {
    return this.lista.filter((m) => m.getAlunoId() === alunoId);
  }

  buscarMatriculasPorPlano(planoId: string): Matricula[] {
    return this.lista.filter((m) => m.getPlanoId() === planoId);
  }

  cancelarMatricula(id: string): Matricula {
    const matricula = this.buscarMatriculaPorId(id);
    matricula.cancelar();
    return matricula;
  }

  verificarVencimentos(): void {
    this.lista.forEach((matricula) => {
      matricula.verificarVencimento();
    });
  }

  filtrarMatriculasPorStatus(status: 'ativa' | 'vencida' | 'cancelada'): Matricula[] {
    return this.lista.filter((m) => m.getStatus() === status);
  }

  filtrarMatriculasPorFormaPagamento(formaPagamento: string): Matricula[] {
    return this.lista.filter((m) => m.getFormaPagamento() === formaPagamento);
  }

  filtrarMatriculasVencendoEm(dias: number): Matricula[] {
    return this.lista.filter((m) => {
      const diasRestantes = m.diasRestantes();
      return diasRestantes <= dias && diasRestantes > 0 && m.getStatus() === 'ativa';
    });
  }

  calcularReceita(): number {
    return this.lista
      .filter((m) => m.getStatus() === 'ativa')
      .reduce((total, m) => total + m.getValorPago(), 0);
  }

  calcularReceitaPorPeriodo(dataInicio: Date, dataFim: Date): number {
    return this.lista
      .filter((m) => {
        const dataInicioMatricula = m.getDataInicio();
        return dataInicioMatricula >= dataInicio && dataInicioMatricula <= dataFim;
      })
      .reduce((total, m) => total + m.getValorPago(), 0);
  }
}