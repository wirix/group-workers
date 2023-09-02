import { body } from 'express-validator';

export const registerValidation = [
	body('email').isEmail(),
	body('password').isLength({ min: 8, max: 30 }),
	body('fullName').isLength({ min: 3, max: 12 }),
];

export const loginValidation = [
	body('email').isEmail(),
	body('password').isLength({ min: 8, max: 30 })
];
