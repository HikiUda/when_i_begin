const Router = require('express');
const router = new Router();
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const deviceRouter = require('./deviceRouter');
const ratingRouter = require('./ratingRouter');
const basketRouter = require('./basketRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/rating', ratingRouter);
router.use('/basket', basketRouter);

module.exports = router;
