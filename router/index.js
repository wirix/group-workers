import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { loginValidation, registerValidation } from '../validations/auth.validation.js';
import { validationErrors } from '../middlewares/validationErrors.middleware.js';
import { checkAuth } from '../middlewares/checkAuth.js';
export const router = new Router();

router.post('/register', registerValidation, validationErrors, userController.register);
router.post('/login', loginValidation, validationErrors, userController.login);
router.get('/logout', userController.logout);
router.get('/refresh', checkAuth, userController.refresh);
router.get('/getUsers', checkAuth, userController.getUsers);
