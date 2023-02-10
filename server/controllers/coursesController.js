const uuid = require('uuid')
const path = require('path')
const {Course} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Op, where} = require('sequelize')
const fs = require("fs");

class coursesController {
    async create(req, res, next) {
        try {
            const {name, about, description} = req.body
            const {img} = req.files
            const imgName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static/courses', imgName))
            const course = await Course.create({name, about, description, img: imgName})
            res.json(course)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res) {
        try {
            const {id, name, description, about} = req.body
            const course = await Course.findOne({where: {id}})
            const {img} = req.files ? req.files: ''
            if (img) {
                fs.unlink(path.resolve(__dirname, '..', 'static/courses', course.img), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Avatar has been deleted")
                    }
                })

                const imgName = uuid.v4() + '.jpg'
                console.log(imgName)
                await img.mv(path.resolve(__dirname, '..', 'static/courses', imgName))
                await Course.update(
                    {
                        name: name,
                        description: description,
                        about: about,
                        img: imgName
                    },
                    {where: {id}}
                ).then(() => res.json({id, name, description, about, img: imgName}))
            } else {
                await Course.update(
                    {
                        name: name,
                        description: description,
                        about: about,
                    },
                    {where: {id}}
                ).then(() => res.json({id, name, description, about, img: course.img}))
            }
        }catch (e) {
            res.json(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {search, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let courses;
        if (search) {
            courses = await Course.findAndCountAll({
                where: {
                    [Op.or]: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        },
                        about: {
                            [Op.iLike]: `%${search}%`
                        },
                        description: {
                            [Op.iLike]: `%${search}%`
                        }

                    }
                }, limit, offset
            }).then(courses => courses).catch(e => e)
        } else {
            courses = await Course.findAndCountAll({limit, offset})
        }
        return res.json(courses)
    }

    async getOne(req, res) {
        try {
            const {id} = req.params
            const card = await Course.findOne({
                where: {id},
            })
            return res.json(card)
        } catch (e) {
            return res.json(e.message)
        }
    }


    async deleteAll(req, res) {
        try {
            return Course.destroy({where: {}, truncate: true, cascade: true})
        } catch (e) {
            return res.json(e.message)
        }
    }


    async deleteOne(req, res) {
        try {
            const {id} = req.params
            const imgName = await Course.findOne({where: {id}}).then(course => course.img)
            fs.unlink(path.resolve(__dirname, '..', 'static/courses', imgName), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Course has been deleted")
                }
            })
            return Course.destroy({where: {id}}).then(id => res.json({id}))
        } catch (e) {
            return res.json(e.message)
        }
    }


}

module.exports = new coursesController()