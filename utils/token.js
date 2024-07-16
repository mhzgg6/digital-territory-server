const { sign, verify } = require('jsonwebtoken')
const { TOKEN_ENCODE_STR, URL_YES_PASS } = require('../config/jwt')

module.exports = {
  create_token (str) {
    const token = sign({ str }, { expiresIn: '2h' }, TOKEN_ENCODE_STR)
    return token
  },
  async check_token(ctx, next) {
    const url = ctx.url
    console.log(url, 'url');
    if (ctx.method !== 'GET' && !URL_YES_PASS.includes(url)) {
      const token = ctx.get('Authorization')
      if (token) {
        try {
          // 验证token是否过期
          const decode = await verify(token, TOKEN_ENCODE_STR)
          if (decode.length === 0) {
            ctx.response.status = 401
            ctx.response.body = { code: 401, msg: '宝贝，登录已过期' }
            return
          }
        } catch (error) {
          ctx.response.status = 401
          ctx.response.body = { code: 401, msg: '宝贝，登录已过期' }
          return
        }
      } else {
        ctx.response.status = 401
        ctx.response.body = { code: 401, msg: '宝贝，快去登录哦' }
        return
      }
    }
    await next()
  }
}
