import { Router } from 'express';
import controller from '../controllers/Teams.controller';

const router = Router();

router.get('/', controller.getAllTeams);
router.get('/:id', controller.getTeamById);

export default router;
