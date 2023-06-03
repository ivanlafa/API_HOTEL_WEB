const { Router, request, response } = require("express");
const { check, validationResult, body, checkSchema } = require("express-validator");
const { login } = require("./../Controllers/Auth");

const router = Router();

// inicio de session
router.post("/login", [checkSchema({
    'correo': {
        notEmpty: true,
        trim: true,
        isEmail: true,
        errorMessage: "El correo no es valido, verifique e intente de nuevo"
    },
    'password': {
        notEmpty: true,
        trim: true,
        errorMessage: "Es necesario el password para ingresar"
    }
})], (req = request, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ "error": errors.array() });
    } else {
        next();
    }
}, login);

module.exports = router;