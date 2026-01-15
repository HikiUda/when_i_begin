const { Basket, BasketDevice, Device } = require('../models/model');

class BasketController {
   async create(req, res, next) {
      try {
         const { id } = req.user;
         const { deviceId } = req.body;
         const basket = await Basket.findOne({ where: { userId: id } });
         const data = await BasketDevice.create({ basketId: basket.id, deviceId });
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async delete(req, res, next) {
      try {
         const { id } = req.user;
         const { deviceId } = req.body;
         const basket = await Basket.findOne({ where: { userId: id } });
         const data = await BasketDevice.destroy({ where: { basketId: basket.id, deviceId } });
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async get(req, res, next) {
      try {
         const { id } = req.user;
         const basket = await Basket.findOne({ where: { userId: id } });
         const data = await BasketDevice.findAll({
            where: { basketId: basket.id },
            include: [{ model: Device, as: 'device' }],
         });
         const devices = data.map((device) => device.device);
         res.json(devices);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new BasketController();
