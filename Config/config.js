const dotenv = require("dotenv").config();



const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PASSWORD = process.env.DB_PASSWORD;


//console.log(process.env.PORT);
// export const PORT = process.env.PORT || 3000
// export const DB_HOST = process.env.DB_HOST || 'localhost'
// export const DB_PORT = process.env.DB_PORT || 8080
// export const DB_USER = process.env.DB_USER || 'root'
// export const DB_DATABASE = process.env.DB_DATABASE || 'hotel'
// export const DB_PASSWORD = process.env.DB_PASSWORD || 'lafa1998'

module.exports = {
    PORT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_DATABASE,
    DB_PASSWORD
}
