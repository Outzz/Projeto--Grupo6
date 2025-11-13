import { Router } from 'express';
import { getMatriculas, createMatricula, updateMatricula, deleteMatricula } from '../controllers/matriculasController';

const router = Router();

router.get('/', getMatriculas);
router.post('/', createMatricula);
router.put('/:id', updateMatricula);
router.delete('/:id', deleteMatricula);

export default router;
