const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING, defaultValue: null},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})
const Course = sequelize.define('course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, defaultValue: null},
    types: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []}
})

const UserCourse = sequelize.define('user_courses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


Course.belongsToMany(User, {through: UserCourse})
User.belongsToMany(Course, {through: UserCourse})


module.exports = {
    User,
    Course,
    UserCourse,
}