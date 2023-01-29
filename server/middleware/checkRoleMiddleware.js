const jwt = require("jsonwebtoken");
const {fn} = require("sequelize");
module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({massage: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (decoded.role !== role) {
            return res.status(403).json({message: "Нет доступа"})
        }
        req.user = decoded;
        next()

    }
};

fn("ADMIN")