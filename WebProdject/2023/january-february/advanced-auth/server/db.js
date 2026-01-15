const { Pool } = require('pg');

const pool = new Pool({
   host: 'localhost',
   port: 5432,
   database: 'advaced_auth',
   user: 'postgres',
   password: 'root',
});

module.exports = pool;
