const Router = require('express');
const router = new Router()
const coursesController = require('../controllers/coursesController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole("ADMIN"), coursesController.create);
router.patch('/', checkRole("ADMIN"), coursesController.update);
router.get('/', coursesController.getAll)
router.delete('/', checkRole("ADMIN"), coursesController.deleteAll)
router.get('/:id', coursesController.getOne)
router.delete('/:id', checkRole("ADMIN"), coursesController.deleteOne)


module.exports = router