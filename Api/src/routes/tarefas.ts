import { Router } from 'express';
import { getTarefas, createTarefa, updateTarefa, deleteTarefa } from '../controllers/tarefasController';

const router = Router();

router.get('/', getTarefas);
router.post('/', createTarefa);
router.put('/:id', updateTarefa);
router.delete('/:id', deleteTarefa);

export default router;
