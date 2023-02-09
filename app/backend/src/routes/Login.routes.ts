import { Router } from 'express';
import validateFields from '../middlewares/validate.fields';
import validateLogin from '../middlewares/validate.login';
import controller from '../controllers/Login.controller';
import validate from '../middlewares/validateToken';

const router = Router();

router.post('/', validateFields, validateLogin, controller.login);
router.get('/validate', validate.confirmToken, controller.loginValidate);

export default router;
