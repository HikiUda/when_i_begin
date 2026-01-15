const Router = require('express');
const ratingController = require('../controller/ratingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.put('/', authMiddleware, ratingController.update);
router.delete('/:id', authMiddleware, ratingController.delete);
router.get('/:id', authMiddleware, ratingController.getOne);

module.exports = router;
