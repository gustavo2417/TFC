import { Router } from 'express';
import leaderboardController from '../controllers/Leaderborder.controller';

const router = Router();

router.get('/home', leaderboardController.getLeaderboardHome);
router.get('/away', leaderboardController.getLeaderboardAway);

export default router;
