import { Router } from 'express';
import { getPlanos, createPlano, updatePlano, deletePlano } from '../controllers/planosController';

const router = Router();

router.get('/', getPlanos);
router.post('/', createPlano);
router.put('/:id', updatePlano);
router.delete('/:id', deletePlano);

export default router;
