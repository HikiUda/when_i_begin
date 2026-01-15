const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const { Device, DeviceInfo } = require('../models/model');

class DeviceController {
   async create(req, res, next) {
      try {
         let { name, price, brandId, typeId, info } = req.body;
         const { img } = req.files;
         let fileName = uuid.v4() + '.png';
         img.mv(path.resolve(__dirname, '..', 'static', fileName));

         const device = await Device.create({ name, price, brandId, typeId, img: fileName });

         if (info) {
            info = JSON.parse(info);
            info.forEach((i) => {
               DeviceInfo.create({
                  title: i.title,
                  description: i.description,
                  deviceId: device.id,
               });
            });
         }

         return res.json(device);
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }
   }
   async getAll(req, res, next) {
      try {
         let { brandId, typeId, limit, page } = req.query;

         page = page || 1;
         limit = limit || 10;
         let offset = page * limit - limit;
         let devices;
         if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset });
         }
         if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
         }
         if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
         }
         if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
         }

         return res.json(devices);
      } catch (e) {
         next(e);
      }
   }
   async getOne(req, res, next) {
      try {
         const { id } = req.params;
         const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: 'info' }],
         });
         return res.json(device);
      } catch (e) {
         next(e);
      }
   }
   async delete(req, res, next) {
      try {
         const { deviceId } = req.body;
         const data2 = await DeviceInfo.destroy({ where: { deviceId: deviceId } });
         const data = await Device.destroy({ where: { id: deviceId } });

         return res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new DeviceController();
