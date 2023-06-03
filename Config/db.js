const mysql2 = require("mysql2");
const mysqlp = require("mysql2/promise");
const { DB_HOST, DB_USER, DB_PORT, DB_DATABASE, DB_PASSWORD } = require("./config");

const pool = mysql2.createConnection({
    host: `${DB_HOST}`,
    user: `${DB_USER}`,
    password: `${DB_PASSWORD}`,
    port: `${DB_PORT}`,
    database: `${DB_DATABASE}`,
});

const pool2 = mysqlp.createPool({
    host: `${DB_HOST}`,
    user: `${DB_USER}`,
    password: `${DB_PASSWORD}`,
    port: `${DB_PORT}`,
    database: `${DB_DATABASE}`,
})

module.exports = {
    pool: pool,
    pool2: pool2
};