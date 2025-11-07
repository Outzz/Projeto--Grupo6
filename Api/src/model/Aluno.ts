import bcrypt from "bcryptjs";

export class Aluno {
  constructor(
    private id: string,
    private nome: string,
    private email: string,
    private telefone: string,
    private senha: string
  ) {
    if (!nome) throw new Error("nome obrigatório");
    if (!email) throw new Error("email obrigatório");
    if (!telefone) throw new Error("telefone obrigatório");
    if (!senha) throw new Error("senha obrigatória");
    if (nome.length < 3) throw new Error("nome muito curto");
    if (senha.length < 6) throw new Error("senha muito curta");
  }

  static create(
    nome: string,
    email: string,
    telefone: string,
    senha: string
  ) {
    const id = crypto.randomUUID();
    const hashedPassword = bcrypt.hashSync(senha);
    return new Aluno(id, nome, email, telefone, hashedPassword);
  }

  verifyPassword(senha: string): boolean {
    return bcrypt.compareSync(senha, this.senha);
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getEmail(): string {
    return this.email;
  }

  getTelefone(): string {
    return this.telefone;
  }

  getSenha(): string {
    return this.senha;
  }

  // Setters
  setNome(nome: string): void {
    this.nome = nome;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setTelefone(telefone: string): void {
    this.telefone = telefone;
  }

  setSenha(senha: string): void {
    const hashedPassword = bcrypt.hashSync(senha);
    this.senha = hashedPassword;
  }
}