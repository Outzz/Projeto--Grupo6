import { Interacao } from "../model/Interacao";

export class InteracaoService {
  lista: Interacao[] = [];

  criarInteracao(interacao: {
    data: Date;
    tipo: 'ligacao' | 'email' | 'reuniao' | 'visita' | 'suporte';
    responsavel: string;
    observacoes?: string;
    resposta?: string;
    status?: 'pendente' | 'respondido';
  }): Interacao {
    const interacaoCreated = Interacao.create(
      interacao.data,
      interacao.tipo,
      interacao.responsavel,
      interacao.observacoes,
      interacao.resposta,
      interacao.status
    );
    this.lista.push(interacaoCreated);
    return interacaoCreated;
  }

  editarInteracao(
    id: string,
    dados: {
      data?: Date;
      tipo?: 'ligacao' | 'email' | 'reuniao' | 'visita' | 'suporte';
      responsavel?: string;
      observacoes?: string;
      resposta?: string;
      status?: 'pendente' | 'respondido';
    }
  ): Interacao {
    const interacao = this.lista.find((i) => i.getId() === id);
    if (!interacao) {
      throw new Error("Interação não encontrada");
    }

    if (dados.data) interacao.setData(dados.data);
    if (dados.tipo) interacao.setTipo(dados.tipo);
    if (dados.responsavel) interacao.setResponsavel(dados.responsavel);
    if (dados.observacoes !== undefined) interacao.setObservacoes(dados.observacoes);
    if (dados.resposta !== undefined) interacao.setResposta(dados.resposta);
    if (dados.status) interacao.setStatus(dados.status);

    return interacao;
  }

  listarInteracoes(): Interacao[] {
    return this.lista;
  }

  buscarInteracaoPorId(id: string): Interacao {
    const interacao = this.lista.find((i) => i.getId() === id);
    if (!interacao) {
      throw new Error("Interação não encontrada");
    }
    return interacao;
  }

  excluirInteracao(id: string): void {
    const index = this.lista.findIndex((i) => i.getId() === id);
    if (index === -1) {
      throw new Error("Interação não encontrada");
    }
    this.lista.splice(index, 1);
  }

  // Métodos de filtro que retornam listas
  filtrarInteracoesPorTipo(tipo: 'ligacao' | 'email' | 'reuniao' | 'visita' | 'suporte'): Interacao[] {
    return this.lista.filter((i) => i.getTipo() === tipo);
  }

  filtrarInteracoesPorResponsavel(responsavel: string): Interacao[] {
    return this.lista.filter((i) =>
      i.getResponsavel().toLowerCase().includes(responsavel.toLowerCase())
    );
  }

  filtrarInteracoesPorStatus(status: 'pendente' | 'respondido'): Interacao[] {
    return this.lista.filter((i) => i.getStatus() === status);
  }

  filtrarInteracoesPorPeriodo(dataInicio: Date, dataFim: Date): Interacao[] {
    return this.lista.filter((i) => {
      const data = i.getData();
      return data >= dataInicio && data <= dataFim;
    });
  }

  filtrarInteracoesPorData(data: Date): Interacao[] {
    return this.lista.filter((i) => {
      const dataInteracao = i.getData();
      return (
        dataInteracao.getDate() === data.getDate() &&
        dataInteracao.getMonth() === data.getMonth() &&
        dataInteracao.getFullYear() === data.getFullYear()
      );
    });
  }

  filtrarInteracoesComResposta(): Interacao[] {
    return this.lista.filter((i) => i.getResposta() !== null && i.getResposta() !== '');
  }

  filtrarInteracoesSemResposta(): Interacao[] {
    return this.lista.filter((i) => !i.getResposta() || i.getResposta() === '');
  }

  // Métodos de busca específicos
  buscarInteracoesPorTexto(texto: string): Interacao[] {
    const textoLower = texto.toLowerCase();
    return this.lista.filter((i) => {
      const observacoes = i.getObservacoes()?.toLowerCase() || '';
      const resposta = i.getResposta()?.toLowerCase() || '';
      const responsavel = i.getResponsavel().toLowerCase();
      
      return (
        observacoes.includes(textoLower) ||
        resposta.includes(textoLower) ||
        responsavel.includes(textoLower)
      );
    });
  }

  // Métodos de estatísticas
  contarInteracoesPorTipo(tipo: 'ligacao' | 'email' | 'reuniao' | 'visita' | 'suporte'): number {
    return this.filtrarInteracoesPorTipo(tipo).length;
  }

  contarInteracoesPorStatus(status: 'pendente' | 'respondido'): number {
    return this.filtrarInteracoesPorStatus(status).length;
  }

  contarInteracoesPorResponsavel(responsavel: string): number {
    return this.filtrarInteracoesPorResponsavel(responsavel).length;
  }

  obterInteracoesRecentes(quantidade: number = 10): Interacao[] {
    return [...this.lista]
      .sort((a, b) => b.getData().getTime() - a.getData().getTime())
      .slice(0, quantidade);
  }

  obterInteracoesPendentes(): Interacao[] {
    return this.filtrarInteracoesPorStatus('pendente');
  }

  obterInteracoesRespondidas(): Interacao[] {
    return this.filtrarInteracoesPorStatus('respondido');
  }

  // Métodos de agrupamento
  agruparInteracoesPorTipo(): Map<string, Interacao[]> {
    const grupos = new Map<string, Interacao[]>();
    
    this.lista.forEach((interacao) => {
      const tipo = interacao.getTipo();
      if (!grupos.has(tipo)) {
        grupos.set(tipo, []);
      }
      grupos.get(tipo)!.push(interacao);
    });
    
    return grupos;
  }

  agruparInteracoesPorResponsavel(): Map<string, Interacao[]> {
    const grupos = new Map<string, Interacao[]>();
    
    this.lista.forEach((interacao) => {
      const responsavel = interacao.getResponsavel();
      if (!grupos.has(responsavel)) {
        grupos.set(responsavel, []);
      }
      grupos.get(responsavel)!.push(interacao);
    });
    
    return grupos;
  }

  // Métodos de relatório
  obterEstatisticas(): {
    total: number;
    porTipo: Record<string, number>;
    porStatus: Record<string, number>;
    comResposta: number;
    semResposta: number;
  } {
    return {
      total: this.lista.length,
      porTipo: {
        ligacao: this.contarInteracoesPorTipo('ligacao'),
        email: this.contarInteracoesPorTipo('email'),
        reuniao: this.contarInteracoesPorTipo('reuniao'),
        visita: this.contarInteracoesPorTipo('visita'),
        suporte: this.contarInteracoesPorTipo('suporte'),
      },
      porStatus: {
        pendente: this.contarInteracoesPorStatus('pendente'),
        respondido: this.contarInteracoesPorStatus('respondido'),
      },
      comResposta: this.filtrarInteracoesComResposta().length,
      semResposta: this.filtrarInteracoesSemResposta().length,
    };
  }
}