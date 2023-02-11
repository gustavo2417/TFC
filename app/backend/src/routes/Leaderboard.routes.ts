import { Router } from 'express';
import getTeams from '../controllers/Leaderborder.controller';

const router = Router();

router.get('/test', getTeams.teste);

export default router;
