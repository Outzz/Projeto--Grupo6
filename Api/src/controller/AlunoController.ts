import { app } from "../server";
import { AlunoService } from "../service/AlunoService";

export function AlunoController() {
  const service = new AlunoService();

  app.get("/alunos", (req, res) => {
    const alunos = service.listarAlunos();
    const alunosSemSenha = alunos.map((aluno) => ({
      id: aluno.getId(),
      nome: aluno.getNome(),
      email: aluno.getEmail(),
      telefone: aluno.getTelefone(),
    }));
    res.json(alunosSemSenha);
  });

  app.post("/alunos", (req, res) => {
    try {
      const dadosAluno = req.body;
      const novoAluno = service.criarAluno(dadosAluno);
      res.status(201).json({
        status: "Aluno criado com sucesso",
        id: novoAluno.getId(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });

  app.put("/alunos/:email", (req, res) => {
    try {
      const { email } = req.params;
      const dados = req.body;
      const alunoAtualizado = service.editarAluno(email, dados);
      res.json({
        status: "Aluno atualizado com sucesso",
        dados: {
          id: alunoAtualizado.getId(),
          nome: alunoAtualizado.getNome(),
          email: alunoAtualizado.getEmail(),
          telefone: alunoAtualizado.getTelefone(),
        },
      });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  app.post("/alunos/autenticacao", (req, res) => {
    try {
      const { email, senha } = req.body;
      const aluno = service.autenticar(email, senha);
      res.json({
        status: "Autenticado com sucesso",
        dados: {
          id: aluno.getId(),
          nome: aluno.getNome(),
          email: aluno.getEmail(),
          telefone: aluno.getTelefone(),
        },
      });
    } catch (e: any) {
      return res.status(401).json({ erro: e.message || "Não autorizado" });
    }
  });

  app.get("/alunos/buscar", (req, res) => {
    const { nome } = req.query;

    // Filtro por nome (retorna lista)
    if (nome) {
      const alunos = service.filtrarAlunosPorNome(nome as string);
      const alunosSemSenha = alunos.map((aluno) => ({
        id: aluno.getId(),
        nome: aluno.getNome(),
        email: aluno.getEmail(),
        telefone: aluno.getTelefone(),
      }));
      return res.status(200).json(alunosSemSenha);
    }

    return res.status(400).json({
      mensagem: "Parâmetros de busca inválidos. Use: nome",
    });
  });
}