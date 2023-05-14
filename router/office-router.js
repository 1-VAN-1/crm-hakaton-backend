const Router = require('express');
const controller = require('../controllers/office-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = new Router();

router.get('/offices', authMiddleware, controller.getOffices);

module.exports = router;
