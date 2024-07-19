const { createCaptcha } = require('../utils/captcha')

const getCaptcha = async (ctx) => {
  const captchaData = createCaptcha({
    size: 4
  })
  try {
    // 存储验证码到 session
    ctx.session.captcha = captchaData.text
    ctx.body = {
      code: 200,
      msg: '获取验证码成功',
      success: true,
      data: captchaData
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: '服务器错误',
      success: false,
      data: {}
    }
  }
}

module.exports = {
  getCaptcha
}