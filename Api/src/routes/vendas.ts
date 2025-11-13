import { Router } from 'express';
import { getVendas, createVenda, updateVenda, deleteVenda } from '../controllers/vendasController';

const router = Router();

router.get('/', getVendas);
router.post('/', createVenda);
router.put('/:id', updateVenda);
router.delete('/:id', deleteVenda);

export default router;
