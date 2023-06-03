const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const GenerateToken = (data) => {
    try {
        const payload = data;
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' });
        console.log("Valor del JWT_KEY => ", process.env.JWT_KEY);
        return Promise.resolve(token);
    } catch (error) {
        return Promise.reject(error)
    }
}


module.exports = {
    GenerateToken,
}