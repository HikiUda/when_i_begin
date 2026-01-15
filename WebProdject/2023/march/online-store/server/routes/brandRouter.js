const Router = require('express');
const router = new Router();
const brandController = require('./../controller/brandController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/', checkRoleMiddleware('ADMIN'), brandController.create);
router.delete('/', checkRoleMiddleware('ADMIN'), brandController.delete);
router.get('/', brandController.get);

module.exports = router;
