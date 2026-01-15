const { Pool } = require('pg');

const pool = new Pool({
   host: 'localhost',
   port: 5432,
   password: 'root',
   user: 'postgres',
   database: 'react_sneakers',
});

module.exports = pool;
