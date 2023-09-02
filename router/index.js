import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { loginValidation, registerValidation } from '../validations/auth.validation.js';
import { validationErrors } from '../middlewares/validationErrors.middleware.js';
export const router = new Router();

router.post('/register', registerValidation, validationErrors, userController.register);
router.post('/login', loginValidation, validationErrors, userController.login);
router.get('/logout', userController.logout);
router.get('/refresh', userController.refresh);
