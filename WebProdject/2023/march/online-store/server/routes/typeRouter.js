const Router = require('express');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const router = new Router();
const typeController = require('./../controller/typeController');

router.post('/', checkRoleMiddleware('ADMIN'), typeController.create);
router.delete('/', checkRoleMiddleware('ADMIN'), typeController.delete);
router.get('/', typeController.get);

module.exports = router;
