const { validationResult } = require('express-validator');
const AuthService = require('../businessLogic/authService');

class AuthController {
   async registeration(req, res) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            throw errors;
         }
         const user = await AuthService.registeration(req.body);
         res.json(user);
      } catch (e) {
         console.log(e.message);
         res.status(400).json(e.message);
      }
   }
   async login(req, res) {
      try {
         const user = await AuthService.login(req.body);
         res.json(user);
      } catch (e) {
         console.log(e.message);
         res.status(400).json(e.message);
      }
   }
   async getUsers(req, res) {
      try {
         const users = await AuthService.getUsers();
         res.json(users);
      } catch (e) {
         console.log(e);
         if (!res.destroyed) {
            res.status(400).json({ message: 'GetUsers Error' });
         }
      }
   }
}

module.exports = new AuthController();
