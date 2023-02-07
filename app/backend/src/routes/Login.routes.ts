import { Router } from 'express';
import validateLogin from '../middlewares/validate.login';
import controller from '../controllers/Login.controller';

const router = Router();

router.post('/', validateLogin, controller.login);

export default router;
