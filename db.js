const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "167349",
    host: "localhost",
    port: 5432,
    database: "userDB"    
});

module.exports = pool;