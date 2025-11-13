import express from "express";
import { AlunoController } from "../Apii/src/controller/AlunoController";
import cors from "cors";

export const app = express();

app.use(express.json());

AlunoController();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
