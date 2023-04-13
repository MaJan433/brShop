const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'user',
    database: 'database',
    password: 'password',
    port: port,
    namedPlaceholders: true
});
module.exports = {
    pool
}
