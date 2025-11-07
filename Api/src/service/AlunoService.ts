import { Aluno } from "../model/Aluno";

export class AlunoService {
  lista: Aluno[] = [];

  criarAluno(aluno: {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
  }): Aluno {
    // Verifica se email já existe
    const alunoExistente = this.lista.find((a) => a.getEmail() === aluno.email);
    if (alunoExistente) {
      throw new Error("Email já cadastrado");
    }

    const alunoCreated = Aluno.create(
      aluno.nome,
      aluno.email,
      aluno.telefone,
      aluno.senha
    );
    this.lista.push(alunoCreated);
    return alunoCreated;
  }

  autenticar(email: string, senha: string): Aluno {
    const aluno = this.lista.find((aluno) => aluno.getEmail() === email);
    if (!aluno || !aluno.verifyPassword(senha)) {
      throw new Error("Email ou senha inválidos");
    }
    return aluno;
  }

  editarAluno(
    email: string,
    dados: {
      nome?: string;
      telefone?: string;
      senha?: string;
    }
  ): Aluno {
    const aluno = this.lista.find((aluno) => aluno.getEmail() === email);
    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }
    if (dados.nome) aluno.setNome(dados.nome);
    if (dados.telefone) aluno.setTelefone(dados.telefone);
    if (dados.senha) aluno.setSenha(dados.senha);
    return aluno;
  }

  listarAlunos(): Aluno[] {
    return this.lista;
  }

  buscarAlunoPorEmail(email: string): Aluno | undefined {
    return this.lista.find((aluno) => aluno.getEmail() === email);
  }

  filtrarAlunosPorNome(nome: string): Aluno[] {
    return this.lista.filter((aluno) =>
      aluno.getNome().toLowerCase().includes(nome.toLowerCase())
    );
  }
}