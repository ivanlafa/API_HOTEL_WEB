const dotenv = require("dotenv").config();
const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validateToken = (req = request, res = response, next) => {
    const token = req.header('Authorization');
    if (token) {
        const complete_token = token.split(' ')[1];
        try {
            const { exp, uid } = jwt.decode(complete_token);
            const now = new Date().getTime() / 1000;
            jwt.verify(complete_token, uid, (err, x) => {
                if (err && now > exp) {
                    return res.status(401).json({
                        "status": 401,
                        "statusText": "El token suministrado no es valido para la aplicacion"
                    })
                }
                next();
            });
        } catch(e) {  
            return res.status(401).json({
                "status": 401,
                "statusText": "401 No Autorizado"
            });
        }
    } else {
        return res.status(401).json({
            "status": 401,
            "statusText": "401 No Autorizado"
        });
    }
}

module.exports = { validateToken }
