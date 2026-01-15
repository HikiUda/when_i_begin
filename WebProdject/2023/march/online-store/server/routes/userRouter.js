const Router = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();
const userController = require('./../controller/userController');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.checkAuth);

module.exports = router;
