const userRouter = require('koa-router')()
const userController = require('../controller/user')

userRouter.get('/api/test', userController.testApi)

module.exports = userRouter