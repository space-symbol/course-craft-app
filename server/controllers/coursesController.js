const uuid = require('uuid')
const path = require('path')
const {Course} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Op, where} = require('sequelize')

class coursesController {
    async create(req, res, next) {
        try {
            const {title, description, types, typeId, userId} = req.body
            const {img} = req.files
            console.log(types)
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const course = await Course.create({title, description, typeId, userId, img: fileName, types: [types]})
            res.json(course)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {searchValue, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let courses;
        if (searchValue) {
            courses = await Course.findAndCountAll({
                where: {
                    [Op.or]:{
                        title:{
                            [Op.like]: searchValue
                        },
                        description: {
                            [Op.like]: searchValue
                        }

                    }
                }, limit, offset
            })
        } else {
            courses = await Course.findAndCountAll({limit, offset})
        }
        return res.json(courses)


    }

    async getOne(req, res, next) {
      try{
          const {id} = req.params
          const card = await Course.findOne({
              where: {id},
          })
          return res.json(card)
      }catch (e){
          return res.json(e.message)
      }
    }


    async deleteAll(req, res) {
        try {
            return Course.destroy({where: {}, truncate: true, cascade: true})
        }catch (e) {
            return res.json(e.message)
        }
    }


    async deleteOne(req, res) {
        try{
            const {id} = req.params
            return Course.destroy({where: {id}})
        }catch (e) {
            return res.json(e.message)
        }

    }
}

module.exports = new coursesController()