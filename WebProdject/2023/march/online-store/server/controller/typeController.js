const { Type } = require('./../models/model');
const ApiError = require('../error/ApiError');

class TypeController {
   async create(req, res, next) {
      try {
         const { name } = req.body;
         const type = await Type.create({ name });

         return res.json(type);
      } catch (e) {
         console.log(e);
         next(e);
      }
   }
   async get(req, res, next) {
      try {
         const types = await Type.findAll();
         return res.json(types);
      } catch (e) {
         next(e);
      }
   }
   async delete(req, res, next) {
      try {
         const { typeId } = req.body;
         const data = await Type.destroy({ where: { id: typeId } });
         return res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new TypeController();
