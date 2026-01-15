const Router = require('express');
const authController = require('../controller/authController');
const { check } = require('express-validator');
const authMIddleware = require('../middleware/authMIddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = Router();

router.post(
   '/registration',
   [
      check('user_name', 'This feild must not be empty!').notEmpty(),
      check('user_password', 'Password must be more then 4 simbols and last then 10').isLength({
         min: 4,
         max: 10,
      }),
   ],
   authController.registeration,
);
router.post('/login', authController.login);
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers);

module.exports = router;
