import { Router } from 'express';
import leaderboardController from '../controllers/Leaderborder.controller';

const router = Router();

router.get('/home', leaderboardController.getLeaderboardHome);

export default router;
