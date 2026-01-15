const { Brand } = require('../models/model');

class BrandController {
   async create(req, res, next) {
      try {
         const { name } = req.body;
         const brand = await Brand.create({ name });
         return res.json(brand);
      } catch (e) {
         next(e);
      }
   }
   async get(req, res, next) {
      try {
         const brands = await Brand.findAll();
         return res.json(brands);
      } catch (e) {
         next(e);
      }
   }
   async delete(req, res, next) {
      try {
         const { brandId } = req.body;
         const data = await Brand.destroy({ where: { id: brandId } });
         return res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new BrandController();
