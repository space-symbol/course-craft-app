const {User} = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

const generateJwt = (id, email, role, avatar) => {
    return jwt.sign(
        {id, email, role, avatar},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, avatar} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest(('Пользователь с таким email уже существует')))
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashPassword, role, avatar})
        const token = generateJwt(user.id, email, user.role, user.avatar)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.avatar)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.avatar)
        return res.json({token})
    }

    async updateAvatar(req, res) {
        const id = req.user.id
        const {img} = req.files
        const user = await User.findOne({where: {id}})
        if (user.avatar) {
            fs.unlink(path.resolve(__dirname, '..', 'static/users', user.avatar), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Avatar has been deleted")
                }
            })
        }
        const imgName = uuid.v4() + '.jpg'
        await img.mv(path.resolve(__dirname, '..', 'static/users', imgName))
        const token =  generateJwt(req.user.id, req.user.email, req.user.role, imgName)
        await User.update(
            {avatar: imgName},
            {where: {id: id}}
        ).then(() => {
            return res.json({token})
        }).catch(e => console.log(e))
    }

    async getAll(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }


    async delete(req, res) {

    }
}

module.exports = new UserController()