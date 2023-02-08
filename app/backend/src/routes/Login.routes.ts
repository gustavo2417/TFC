import { Router } from 'express';
import validateFields from '../middlewares/validate.fields';
import validateLogin from '../middlewares/validate.login';
import validateToken from '../middlewares/validateToken';
import controller from '../controllers/Login.controller';

const router = Router();

router.post('/', validateFields, validateLogin, controller.login);
router.get('/validate', validateToken, controller.loginValidate);

export default router;
