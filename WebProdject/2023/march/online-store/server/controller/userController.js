const ApiError = require('../error/ApiError');
const { User } = require('../models/model');
const { Basket } = require('../models/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
   return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
      expiresIn: '24h',
   });
};

class UserController {
   async registration(req, res, next) {
      try {
         const { email, password, role } = req.body;
         if (!email || !password) {
            throw ApiError.badRequest('Некоректный email или password');
         }
         const candidate = await User.findOne({ where: { email } });
         if (candidate) {
            throw ApiError.badRequest('Пользователь с таким email уже существует');
         }
         const hashPassword = await bcrypt.hash(password, 5);
         const user = await User.create({ email, role, password: hashPassword });
         const basket = await Basket.create({ userId: user.id });
         const token = generateJwt(user.id, email, role);
         return res.json({ token });
      } catch (e) {
         console.log(e);
         next(e);
      }
   }
   async login(req, res, next) {
      try {
         const { email, password } = req.body;
         const user = await User.findOne({ where: { email } });
         if (!user) {
            throw ApiError.internal('Пользователь не найден');
         }
         let comparePassword = bcrypt.compareSync(password, user.password);
         if (!comparePassword) {
            throw ApiError.internal('Указан неверный пароль');
         }
         const token = generateJwt(user.id, user.email, user.role);
         return res.json({ token });
      } catch (e) {
         console.log(e);
         next(e);
      }
   }
   async checkAuth(req, res, next) {
      try {
         const token = generateJwt(req.user.id, req.user.email, req.user.role);
         res.json({ token });
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new UserController();
