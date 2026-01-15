const Router = require('express').Router;
const sneakersController = require('./../controllers/sneakersController');

const router = new Router();

router.get('/sneakers', sneakersController.getSneakers);
router.get('/sneakers/liked', sneakersController.getLikedSneakers);
router.get('/sneakers/cart', sneakersController.getSneakersInCart);
router.put('/sneakers/:id', sneakersController.changeSneakers);
router.get('/sneakers/purches', sneakersController.getPurchesSneakers);
router.post('/sneakers/purches', sneakersController.addPurchesSneakers);

module.exports = router;
