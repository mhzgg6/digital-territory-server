const userRouter = require('koa-router')()
const userController = require('../controller/user')
const captchaController = require('../controller/captcha')

// userRouter.get('/api/test', userController.testApi)

userRouter.get('/api/user/captcha', captchaController.getCaptcha)
userRouter.post('/api/user/register', userController.register)

module.exports = userRouter