import { Venda } from "../model/Venda";

export class VendaService {
  lista: Venda[] = [];

  criarVenda(venda: {
    cliente: string;
    produto: string;
    valor: number;
    responsavel: string;
    status?: 'em_negociacao' | 'fechado' | 'perdido';
  }): Venda {
    const vendaCreated = Venda.create(
      venda.cliente,
      venda.produto,
      venda.valor,
      venda.responsavel,
      venda.status
    );
    this.lista.push(vendaCreated);
    return vendaCreated;
  }

  editarVenda(
    id: string,
    dados: {
      cliente?: string;
      produto?: string;
      valor?: number;
      responsavel?: string;
      status?: 'em_negociacao' | 'fechado' | 'perdido';
    }
  ): Venda {
    const venda = this.lista.find((v) => v.getId() === id);
    if (!venda) {
      throw new Error("Venda não encontrada");
    }

    if (dados.cliente) venda.setCliente(dados.cliente);
    if (dados.produto) venda.setProduto(dados.produto);
    if (dados.valor !== undefined) venda.setValor(dados.valor);
    if (dados.responsavel) venda.setResponsavel(dados.responsavel);
    if (dados.status) venda.setStatus(dados.status);

    return venda;
  }

  listarVendas(): Venda[] {
    return this.lista;
  }

  buscarVendaPorId(id: string): Venda {
    const venda = this.lista.find((v) => v.getId() === id);
    if (!venda) {
      throw new Error("Venda não encontrada");
    }
    return venda;
  }

  excluirVenda(id: string): void {
    const index = this.lista.findIndex((v) => v.getId() === id);
    if (index === -1) {
      throw new Error("Venda não encontrada");
    }
    this.lista.splice(index, 1);
  }

  // Métodos de filtro que retornam listas
  filtrarVendasPorStatus(status: 'em_negociacao' | 'fechado' | 'perdido'): Venda[] {
    return this.lista.filter((v) => v.getStatus() === status);
  }

  filtrarVendasPorResponsavel(responsavel: string): Venda[] {
    return this.lista.filter((v) => v.getResponsavel() === responsavel);
  }

  filtrarVendasPorCliente(cliente: string): Venda[] {
    return this.lista.filter((v) =>
      v.getCliente().toLowerCase().includes(cliente.toLowerCase())
    );
  }

  filtrarVendasPorProduto(produto: string): Venda[] {
    return this.lista.filter((v) =>
      v.getProduto().toLowerCase().includes(produto.toLowerCase())
    );
  }

  filtrarVendasPorValorMinimo(valorMinimo: number): Venda[] {
    return this.lista.filter((v) => v.getValor() >= valorMinimo);
  }

  filtrarVendasPorFaixaValor(valorMin: number, valorMax: number): Venda[] {
    return this.lista.filter((v) => {
      const valor = v.getValor();
      return valor >= valorMin && valor <= valorMax;
    });
  }

  // Métodos de cálculo e estatísticas
  calcularValorTotalVendas(): number {
    return this.lista.reduce((total, v) => total + v.getValor(), 0);
  }

  calcularValorTotalPorStatus(status: 'em_negociacao' | 'fechado' | 'perdido'): number {
    return this.filtrarVendasPorStatus(status)
      .reduce((total, v) => total + v.getValor(), 0);
  }

  calcularValorTotalPorResponsavel(responsavel: string): number {
    return this.filtrarVendasPorResponsavel(responsavel)
      .reduce((total, v) => total + v.getValor(), 0);
  }

  calcularMediaValorVendas(): number {
    if (this.lista.length === 0) return 0;
    return this.calcularValorTotalVendas() / this.lista.length;
  }

  contarVendasPorStatus(status: 'em_negociacao' | 'fechado' | 'perdido'): number {
    return this.filtrarVendasPorStatus(status).length;
  }

  obterVendasRecentes(quantidade: number = 10): Venda[] {
    return [...this.lista]
      .sort((a, b) => b.getDataCriacao().getTime() - a.getDataCriacao().getTime())
      .slice(0, quantidade);
  }
}