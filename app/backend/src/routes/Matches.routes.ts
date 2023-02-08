import { Router } from 'express';
import controller from '../controllers/Matches.controller';

const router = Router();

router.get('/', controller.getAllTeams);

export default router;
