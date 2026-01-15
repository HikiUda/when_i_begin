const db = require('./../db');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const UserDto = require('../dtos/userDto');
const ApiError = require('../exceptions/apiError');

class UserService {
   async registration(email, password) {
      const candidate = await db.query('SELECT email FROM users WHERE email = ($1)', [email]);
      if (candidate.rows.length) {
         throw ApiError.BadRequest('Users with this email already exists');
      }
      const hashPassword = bcrypt.hashSync(password, 3);
      const activationLink = uuid.v4();
      const user = await db.query(
         'INSERT INTO users (email, password, activation_link) VALUES ($1, $2, $3) RETURNING *',
         [email, hashPassword, activationLink],
      );
      await mailService.sendActivationMail(
         email,
         `${process.env.API_URL}/api/activate/${activationLink}`,
      );
      const userDto = new UserDto(user.rows[0]);
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
         ...tokens,
         user: userDto,
      };
   }
   async activate(activationLink) {
      const condidate = await db.query(
         'SELECT id, activation_link FROM users WHERE activation_link = ($1)',
         [activationLink],
      );
      if (!condidate.rows.length) {
         throw ApiError.BadRequest('inncorect activation link');
      }
      const user = condidate.rows[0];
      await db.query('UPDATE users SET is_activated = ($1) WHERE id = ($2)', [true, user.id]);
   }
   async login(email, password) {
      const candidate = await db.query('SELECT * FROM users WHERE email = ($1)', [email]);
      if (!candidate.rows.length) {
         throw ApiError.BadRequest('User with this email not found');
      }
      const user = candidate.rows[0];
      const isPassEquals = bcrypt.compareSync(password, user.password);
      if (!isPassEquals) {
         throw ApiError.BadRequest('Wrong password');
      }
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
         ...tokens,
         user: userDto,
      };
   }
   async logout(refreshToken) {
      const token = await tokenService.removeToken(refreshToken);
      return token;
   }
   async refresh(refreshToken) {
      if (!refreshToken) {
         throw ApiError.UnauthorizedError();
      }

      const userData = tokenService.validateRefreshToken(refreshToken);

      const tokenFromDb = await tokenService.findToken(refreshToken);

      if (!userData || !tokenFromDb) {
         throw ApiError.UnauthorizedError();
      }

      const user = await db.query('SELECT * FROM users WHERE id = ($1)', [userData.id]);

      const userDto = new UserDto(user.rows[0]);
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
         ...tokens,
         user: userDto,
      };
   }
   async getUsers() {
      const users = await db.query('SELECT * FROM users');
      return users.rows;
   }
}

module.exports = new UserService();
