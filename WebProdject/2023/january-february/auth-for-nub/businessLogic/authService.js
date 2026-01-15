const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const getRoles = async (id) => {
   const rolesID = await db.query('SELECT role_id FROM users_roles WHERE user_id = ($1)', [id]);
   if (!rolesID.rows.length) {
      throw new Error();
   }
   const roles = rolesID.rows.map((roleID) => roleID.role_id);
   //console.log(roles);

   const rolesName = roles.map(async (role) => {
      const name = await db.query('SELECT role_name FROM roles WHERE role_id = ($1)', [role]);
      return name.rows[0].role_name;
   });

   return rolesName;
};

const generateAccessToken = async (id) => {
   const rolesName = await getRoles(id);

   const roles = await Promise.all(rolesName).then((res) => {
      return res;
   });

   //console.log(roles);

   const payload = {
      id,
      roles,
   };
   return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class AuthService {
   async registeration({ user_name, user_password }) {
      if (!user_password || !user_name) {
         throw new Error('Enter user_name and user_password');
      }
      const isRegister = await db.query('SELECT * FROM users WHERE user_name = ($1)', [user_name]);
      if (isRegister.rows.length) {
         throw new Error('User already exsist');
         //res.json('User already exsist');
      }
      const hashPassword = bcrypt.hashSync(user_password, 5);
      const user = await db.query(
         'INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING *',
         [user_name, hashPassword],
      );
      if (user.rows.length) {
         const role = await db.query('INSERT INTO users_roles VALUES ($1, $2) RETURNING *', [
            user.rows[0].user_id,
            2,
         ]);
      }

      return user.rows;
   }
   async login({ user_name, user_password }) {
      if (!user_password || !user_name) {
         throw new Error('Enter user_name and user_password');
      }
      const isRegister = await db.query('SELECT * FROM users WHERE user_name = ($1)', [user_name]);
      if (!isRegister.rows.length) {
         throw new Error('User not exsist');
      }

      const user = isRegister.rows[0];
      if (!bcrypt.compareSync(user_password, user.user_password)) {
         throw new Error('Invalid password');
      }
      const token = await generateAccessToken(user.user_id);

      return { token, message: "You're login" };
   }
   async getUsers() {
      const users = await db.query('SELECT * FROM users');
      return users.rows;
   }
}

module.exports = new AuthService();
