const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const apiClient = {
  // ============ INTERAÇÕES ============
  async getInteracoes() {
    const response = await fetch(`${API_BASE_URL}/api/interacoes`);
    if (!response.ok) throw new Error('Erro ao buscar interações');
    return response.json();
  },

  async createInteracao(data: {
    data: string;
    tipo: 'ligacao' | 'email' | 'reuniao' | 'visita' | 'suporte';
    responsavel: string;
    observacoes?: string;
    resposta?: string;
    status?: 'pendente' | 'respondido';
  }) {
    const response = await fetch(`${API_BASE_URL}/interacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar interação');
    return response.json();
  },

  async updateInteracao(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/interacoes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar interação');
    return response.json();
  },

  async deleteInteracao(id: string) {
    const response = await fetch(`${API_BASE_URL}/interacoes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir interação');
    return response.json();
  },

  // ============ VENDAS ============
  async getVendas() {
    const response = await fetch(`${API_BASE_URL}/api/vendas`);
    if (!response.ok) throw new Error('Erro ao buscar vendas');
    return response.json();
  },

  async createVenda(data: {
    cliente: string;
    produto: string;
    valor: number;
    responsavel: string;
    status?: 'em_negociacao' | 'fechado' | 'perdido';
  }) {
    const response = await fetch(`${API_BASE_URL}/vendas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar venda');
    return response.json();
  },

  async updateVenda(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/vendas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar venda');
    return response.json();
  },

  async deleteVenda(id: string) {
    const response = await fetch(`${API_BASE_URL}/vendas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir venda');
    return response.json();
  },

  // ============ TAREFAS ============
  async getTarefas() {
    const response = await fetch(`${API_BASE_URL}/api/tarefas`);
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    return response.json();
  },

  async createTarefa(data: {
    descricao: string;
    responsavel: string;
    prazo: string;
    prioridade?: 'baixa' | 'media' | 'alta';
    status?: 'pendente' | 'em_andamento' | 'concluida';
  }) {
    const response = await fetch(`${API_BASE_URL}/tarefas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar tarefa');
    return response.json();
  },

  async updateTarefa(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar tarefa');
    return response.json();
  },

  async deleteTarefa(id: string) {
    const response = await fetch(`${API_BASE_URL}/tarefas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir tarefa');
    return response.json();
  },

  // ============ USUÁRIOS ============
  async getUsuarios() {
    const response = await fetch(`${API_BASE_URL}/api/usuarios`);
    if (!response.ok) throw new Error('Erro ao buscar usuários');
    return response.json();
  },

  async createUsuario(data: any) {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar usuário');
    return response.json();
  },

  async updateUsuario(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar usuário');
    return response.json();
  },
};