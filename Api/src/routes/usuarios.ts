import { Router } from 'express';
import { getUsuarios } from '../controllers/usuariosController';

const router = Router();

router.get('/', getUsuarios);

export default router;
