const Router = require('express');
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware")

router.post('/registration', userController.registration);
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/users', checkRoleMiddleware('ADMIN'), userController.getAll)
router.post('/upload_avatar', authMiddleware, userController.updateAvatar)

module.exports = router