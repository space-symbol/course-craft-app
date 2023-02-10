const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).json({massage: "Не авторизован"})
    }
    req.user = jwt.verify(token, process.env.SECRET_KEY)
    next()
}