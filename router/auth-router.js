const Router = require('express');
const controller = require('../controllers/auth-controller');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware');

const router = new Router();

router.post(
	'/auth/registration',
	[
		body('email', 'Invalid email')
			.isEmail()
			.contains('joy-dev.ru')
			.withMessage('domain must be joy-dev.ru'),
	],
	controller.registration
);

router.post('/auth/login', controller.login);

router.post('/auth/logout', authMiddleware, controller.logout);

router.get('/auth/refresh', controller.refresh);

module.exports = router;
