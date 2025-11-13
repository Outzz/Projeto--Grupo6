import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vendasRoutes from './routes/vendas';
import tarefasRoutes from './routes/tarefas';
import interacoesRoutes from './routes/interacoes';
import usuariosRoutes from './routes/usuarios';
import planosRoutes from './routes/planos';
import alunosRoutes from './routes/alunos';
import matriculasRoutes from './routes/matriculas';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/vendas', vendasRoutes);
app.use('/api/tarefas', tarefasRoutes);
app.use('/api/interacoes', interacoesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/planos', planosRoutes);
app.use('/api/alunos', alunosRoutes);
app.use('/api/matriculas', matriculasRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
