const Router = require('express');
const controller = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');
const queryParamsMiddleware = require('../middleware/query-params-middleware');

const router = new Router();

router.get('/users/:id', authMiddleware, controller.getUser);
router.get('/users', [queryParamsMiddleware], controller.getUsers);

router.patch('/user', authMiddleware, controller.patchUser);

module.exports = router;
