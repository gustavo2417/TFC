import { Router } from 'express';
import controller from '../controllers/Matches.controller';
import validate from '../middlewares/validateToken';
import validateTeams from '../middlewares/validate.match';

const router = Router();

router.get('/', controller.getAllTeams);
router.post('/', validate.tokenValid, validateTeams, controller.create);
router.patch('/:id/finish', controller.updateStatus);

export default router;
