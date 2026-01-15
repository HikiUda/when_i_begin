const Router = require('express');
const router = new Router();
const deviceController = require('./../controller/deviceController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/', checkRoleMiddleware('ADMIN'), deviceController.create);
router.delete('/', checkRoleMiddleware('ADMIN'), deviceController.delete);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

module.exports = router;
