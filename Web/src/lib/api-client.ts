const API_BASE_URL = 'https://grupo06projeto.escolatecnicaadelia.info/api';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ erro: 'Erro desconhecido' }));
      throw new Error(error.erro || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Vendas
  async getVendas(): Promise<any[]> {
    return this.request<any[]>('/vendas');
  }

  async createVenda(data: any): Promise<any> {
    return this.request<any>('/vendas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateVenda(id: string, data: any): Promise<any> {
    return this.request<any>(`/vendas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteVenda(id: string): Promise<any> {
    return this.request<any>(`/vendas/${id}`, {
      method: 'DELETE',
    });
  }

  // Tarefas
  async getTarefas(): Promise<any[]> {
    return this.request<any[]>('/tarefas');
  }

  async createTarefa(data: any): Promise<any> {
    return this.request<any>('/tarefas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTarefa(id: string, data: any): Promise<any> {
    return this.request<any>(`/tarefas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTarefa(id: string): Promise<any> {
    return this.request<any>(`/tarefas/${id}`, {
      method: 'DELETE',
    });
  }

  // Interações
  async getInteracoes(): Promise<any[]> {
    return this.request<any[]>('/interacoes');
  }

  async createInteracao(data: any): Promise<any> {
    return this.request<any>('/interacoes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInteracao(id: string, data: any): Promise<any> {
    return this.request<any>(`/interacoes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteInteracao(id: string): Promise<any> {
    return this.request<any>(`/interacoes/${id}`, {
      method: 'DELETE',
    });
  }

  // Usuários (para selects de responsáveis)
  async getUsuarios(): Promise<any[]> {
    return this.request<any[]>('/usuarios');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
