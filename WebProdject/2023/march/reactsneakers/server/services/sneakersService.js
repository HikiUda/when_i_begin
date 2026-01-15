const db = require('./../db');
const ApiError = require('./../exceptions/apiError');
const { inSneakersDto } = require('./../dto/sneakersDto');
const { inPurchesSneakersDto } = require('./../dto/purchesSneakersDto');

class SneakersService {
   async getSneakers(limit = 100, page = 1, search = '') {
      try {
         const offset = limit * (page - 1);
         if (search) {
            const sneakers = await db.query(
               `SELECT * FROM sneakers WHERE regexp_like(title, ($1) , 'i') ORDER BY sneakers_id  LIMIT ($2) OFFSET ($3)`,
               [search, limit, offset],
            );
            return sneakers.rows;
         }
         const sneakers = await db.query(
            'SELECT * FROM sneakers ORDER BY sneakers_id LIMIT ($1) OFFSET ($2)',
            [limit, offset],
         );
         return inSneakersDto(sneakers.rows);
      } catch (e) {
         console.log(e);
         return ApiError.RequestError('Bad GET', e);
      }
   }
   async getLikedSneakers(limit = 100, page = 1) {
      try {
         const offset = limit * (page - 1);
         const sneakers = await db.query(
            'SELECT * FROM sneakers WHERE is_liked = true ORDER BY sneakers_id LIMIT ($1) OFFSET ($2)',
            [limit, offset],
         );
         return inSneakersDto(sneakers.rows);
      } catch (e) {
         return ApiError.RequestError('Bad GET', e);
      }
   }
   async getSneakersInCart(limit = 100, page = 1) {
      try {
         const offset = limit * (page - 1);
         const sneakers = await db.query(
            'SELECT * FROM sneakers WHERE in_cart = true ORDER BY sneakers_id LIMIT ($1) OFFSET ($2)',
            [limit, offset],
         );
         return inSneakersDto(sneakers.rows);
      } catch (e) {
         return ApiError.RequestError('Bad GET', e);
      }
   }
   async changeSneakers(id, isLiked = false, inCart = false) {
      try {
         if (id) {
            const data = await db.query(
               'UPDATE sneakers SET is_liked = ($1), in_cart = ($2) WHERE sneakers_id = ($3) RETURNING *',
               [isLiked, inCart, id],
            );
            return data.rows;
         }
         throw new Error();
      } catch (e) {
         return ApiError.RequestError('Bad PUT', e);
      }
   }
   async getPurchesSneakers(limit = 100, page = 1) {
      try {
         const offset = limit * (page - 1);
         const data = await db.query(
            'SELECT * FROM purches JOIN sneakers USING(sneakers_id) ORDER BY purches_id LIMIT ($1) OFFSET ($2)',
            [limit, offset],
         );
         return inPurchesSneakersDto(data.rows);
      } catch (e) {
         return ApiError.RequestError('Bad GET', e);
      }
   }
   async addPurchesSneakers(products) {
      try {
         const arr = [];
         for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if (product.id) {
               const data = await db.query(
                  'INSERT INTO purches (sneakers_id) VALUES ($1) RETURNING *',
                  [product.id],
               );
               arr.push(data.rows[0]);
            }
         }

         await db.query('UPDATE sneakers SET in_cart = false');

         if (!arr.length) {
            throw new Error();
         }
         //console.log(arr);
         return arr;
      } catch (e) {
         return ApiError.RequestError('Bad POST', e);
      }
   }
}

module.exports = new SneakersService();
