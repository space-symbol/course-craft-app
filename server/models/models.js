const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING, defaultValue: ''},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})
const Course = sequelize.define('course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    about: {type: DataTypes.STRING(1000)},
    description: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, defaultValue: null},
})
const Unconfirmed_Course = sequelize.define('unconfirmed_course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    about: {type: DataTypes.STRING(1000)},
    description: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, defaultValue: null},
})

const User_Course = sequelize.define('user_course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})



Unconfirmed_Course.hasOne(User)
Unconfirmed_Course.belongsTo(User)
User.hasMany(Unconfirmed_Course)
Course.hasMany(User)
Course.belongsToMany(User, {through: User_Course})
User.hasMany(Course)


module.exports = {
    User,
    Course,
    Unconfirmed_Course,
}