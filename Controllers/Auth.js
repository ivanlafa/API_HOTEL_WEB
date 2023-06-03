const { request, response } = require("express");
const { pool2 } = require("./../Config/db");
const { GenerateToken } = require("../utils/auth");
const { auth } = require("../utils/queries")

const login = async (req = request, res = response) => {
    try {
        let { correo, password } = req.body;
        const [result] = await pool2.query(`${auth(correo, password)}`);
        if (result != null || result != "") {
            const token = await GenerateToken(result[0]);
            return res.status(200).json({
                "usuario": result[0],
                "AccessToken": token
            });
        }
    } catch (err) {
        return res.status(401).json({ "error": `Usuario no existe en la base de datos => ${err}]` })
    }
}

module.exports = {
    login
}