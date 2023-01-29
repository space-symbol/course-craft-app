const Router = require('express');
const router = new Router()

const userRouter = require('./userRouter')
const coursesRouter = require('./coursesRouter')

router.use('/user', userRouter);
router.use('/courses', coursesRouter)

module.exports = router