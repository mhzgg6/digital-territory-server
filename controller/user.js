const User = require('../db/user')
const { create_token } = require('../utils/token')

const findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const saveUser = (userInfo) => {
  const _user = new User(userInfo)
  return new Promise((resolve, reject) => {
    _user.save()
      .then(res => {
        resolve(true)
      })
      .catch(err => {
        reject(false)
      })
  })
}

const register = async (ctx) => {
  let { username, password } = ctx.request.body

  try {
    const findResult = await findUser(username)
    console.log(findResult, 'register')
    if (!findResult) {
      const status = await saveUser({
        username,
        password
      })
      if (status) {
        ctx.body = {
          code: 200,
          msg: '注册成功',
          success: true,
          data: {}
        }
      } else {
        ctx.body = {
          code: 401,
          msg: '注册失败',
          success: false,
          data: {}
        }
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '用户名已存在',
        success: false,
        data: {}
      }
    }
  } catch (error) {
    ctx.body = {
      state: 500,
      msg: '服务器异常',
      success: false,
      data: {}
    } 
  }
}

// 用户登录
const login = async (ctx) => {
  let { username, password, code } = ctx.request.body
  code = 'Sp5R'
  try {
    console.log(ctx.session)
    // 处理验证码
    const { captcha } = ctx.session
    if (code && code.toLowerCase() === captcha.toLowerCase()) {
      const findResult = await findUser(username)
      console.log(findResult)
      if (findResult) {
        if (findResult.password === password) {
          const token = create_token(username)
          // 清除验证码
          delete ctx.session
          ctx.body = {
            code: 200,
            msg: '登录成功',
            success: true,
            data: {
              token,
              userId: findResult._id,
              userName: findResult.username
            }
          }
        }
      } else {
        ctx.body = {
          state: 401,
          msg: '用户名或密码错误',
          success: false,
          data: {}
        } 
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '验证码错误',
        success: false,
        data: {}
      }
    }
  } catch (error) {
    ctx.body = {
      state: 500,
      msg: '服务器异常',
      success: false,
      data: {}
    }  
  }
}

module.exports = {
  login,
  register
}