const { Rating, Device } = require('../models/model');

async function changeRating(deviceId) {
   const count = await Rating.count({ where: { deviceId } });
   const sumRating = await Rating.sum('rate', { where: { deviceId } });

   const rating = (sumRating / count).toFixed(1);
   //console.log(rating, sumRating, count);

   await Device.update({ rating }, { where: { id: deviceId } });
}

class RatingController {
   async update(req, res, next) {
      try {
         const { id: userId } = req.user;
         const { deviceId, rate } = req.body;
         const candidate = await Rating.findOne({
            where: {
               userId,
               deviceId,
            },
         });
         let data;
         if (candidate) {
            data = await Rating.update({ rate }, { where: { userId, deviceId } });
         } else {
            data = await Rating.create({ rate, deviceId, userId });
         }
         changeRating(deviceId);
         return res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async delete(req, res, next) {
      try {
         const { id: userId } = req.user;
         const { id: deviceId } = req.params;
         const data = await Rating.destroy({ where: { userId, deviceId } });
         changeRating(deviceId);
         return res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getOne(req, res, next) {
      try {
         const { id: userId } = req.user;
         const { id: deviceId } = req.params;
         const data = await Rating.findOne({ where: { userId, deviceId } });
         return res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new RatingController();
