const sneakersService = require('./../services/sneakersService');

class SneakersController {
   async getSneakers(req, res, next) {
      try {
         const { limit, page, search } = req.query;
         const data = await sneakersService.getSneakers(limit, page, search);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getLikedSneakers(req, res, next) {
      try {
         const { limit, page } = req.query;
         const data = await sneakersService.getLikedSneakers(limit, page);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getSneakersInCart(req, res, next) {
      try {
         const { limit, page } = req.query;
         const data = await sneakersService.getSneakersInCart(limit, page);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async changeSneakers(req, res, next) {
      try {
         const { isLiked, inCart } = req.body;
         const { id } = req.params;
         //console.log(isLiked, inCart, id);
         const data = await sneakersService.changeSneakers(id, isLiked, inCart);
         //console.log(data);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getPurchesSneakers(req, res, next) {
      try {
         const { limit, page } = req.query;
         const data = await sneakersService.getPurchesSneakers(limit, page);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async addPurchesSneakers(req, res, next) {
      try {
         const { products } = req.body;
         const data = await sneakersService.addPurchesSneakers(products);
         //console.log(data);
         res.json({ products: data });
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new SneakersController();
