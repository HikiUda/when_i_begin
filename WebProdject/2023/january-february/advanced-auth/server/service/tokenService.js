const jwt = require('jsonwebtoken');
const db = require('./../db');

class TokenService {
   generateTokens(payload) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s' });
      return {
         accessToken,
         refreshToken,
      };
   }

   validateAccessToken(token) {
      try {
         const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
         return userData;
      } catch (e) {
         return null;
      }
   }
   validateRefreshToken(token) {
      try {
         const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
         return userData;
      } catch (e) {
         return null;
      }
   }

   async saveToken(userId, refreshToken) {
      const tokenData = await db.query('SELECT * FROM tokens WHERE user_id = ($1)', [userId]);
      if (tokenData.rows.length) {
         const token = await db.query(
            'UPDATE tokens SET refresh_token = ($1) WHERE user_id = ($2) RETURNING *',
            [refreshToken, userId],
         );
         return token.rows[0];
      }
      const token = await db.query('INSERT INTO tokens VALUES ($1, $2)', [userId, refreshToken]);
      return token.rows[0];
   }
   async removeToken(refreshToken) {
      const token = await db.query('DELETE FROM tokens WHERE refresh_token = ($1) RETURNING *', [
         refreshToken,
      ]);
      return token.rows[0];
   }
   async findToken(refreshToken) {
      const tokenData = await db.query('SELECT * FROM tokens WHERE refresh_token = ($1)', [
         refreshToken,
      ]);
      if (!tokenData.rows.length) {
         return null;
      }
      return tokenData.rows[0];
   }
}

module.exports = new TokenService();
