const User = require('../db/user')

const findUser = (username) => {
  const result = {}
  return new Promise((resolve, reject) => {
    User.find({ username })
      .then(res => {
        console.log(res, 'findUser')
        if (res.length > 0) {
          result.isExist = true
          result.message = '用户已存在'
          resolve(result)
        } else {
          result.isExist = false
          result.message = '用户不存在'
          resolve(result)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 用户注册
const register = async (ctx) => {
  console.log('注册：：：，', ctx.request.body);
  let { username, password } = ctx.request.body
  username = '1111'
  const msg = {}
  try {
    const { isExist, message } = await findUser(username)
    if (isExist) {
      // 登录
      msg.code = 200
      msg.msg = message
      msg.success = false
      msg.data = {}
      console.log('1111',msg)
    } else {
      // 注册
      const _user = new User({ 
        username, 
        password 
      })
      const res = await _user.save()
      console.log(res, 'res')
    }
    // ctx.body = {
    //   code: 200,
    //   msg: '注册成功',
    //   success: true,
    //   data: {
    //     name: 'register'
    //   }
    // }
    ctx.body = msg
  } catch (error) {
    console.log(error, 'error')  
    ctx.body = {
      state: 500,
      msg: '服务器异常',
      success: false,
      data: {}
    }  
  }
}

module.exports = {
  testApi,
  register
}