const { createCaptcha } = require('../utils/captcha')
const { MAX_TIME, MAX_REQUESTS } = require("../config/session")
const getCaptcha = async (ctx) => {
  try {
    const nowTime = Date.now()
    // 获取历史请求时间
    const history = ctx.session.captchaHistory || []
    // 过滤掉过期的请求
    const cleanedHistory = history.filter(timestamp => nowTime - timestamp < MAX_TIME)
    
    if (cleanedHistory.length >= MAX_REQUESTS) {
      return ctx.body = {
        code: 401,
        msg: '请求验证码过于频繁，请稍后再试',
        success: false,
        data: {}
      }
    } else {
      const captchaData = createCaptcha({
        size: 4
      })
      // 存储验证码到 session
      ctx.session.captcha = captchaData.text
      console.log(ctx.session, '设置验证码');
      // 更新历史请求时间
      ctx.session.captchaHistory = [...cleanedHistory, nowTime]
      ctx.body = {
        code: 200,
        msg: '获取验证码成功',
        success: true,
        data: captchaData
      }
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