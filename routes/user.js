const userRouter = require('koa-router')()
const userController = require('../controller/user')

userRouter.get('/api/test', userController.testApi)

userRouter.post('/api/register', userController.register)

module.exports = userRouter