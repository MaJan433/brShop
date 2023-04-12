const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'portfolio_shop',
    password: 'maria11',
    port: 4900,
    namedPlaceholders: true
});
module.exports = {
    pool
}