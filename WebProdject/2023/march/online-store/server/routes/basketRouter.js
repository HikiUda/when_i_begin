const Router = require('express');
const basketController = require('./../controller/basketController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/', authMiddleware, basketController.create);
router.delete('/', authMiddleware, basketController.delete);
router.get('/', authMiddleware, basketController.get);

module.exports = router;
