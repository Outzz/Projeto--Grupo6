import { Router } from 'express';
import { getInteracoes, createInteracao, updateInteracao, deleteInteracao } from '../controllers/interacoesController';

const router = Router();

router.get('/', getInteracoes);
router.post('/', createInteracao);
router.put('/:id', updateInteracao);
router.delete('/:id', deleteInteracao);

export default router;
