const User = require('../db/user')

const testApi = async (ctx) => {
  ctx.body = {
    code: 200,
    msg: 'testApi',
    success: true,
    data: {
      name: 'testApi'
    }
  }
}
const findUser = (name) => {
  return new Promise((resolve, reject) => {
    User.findOne({ name }, (err, doc) => {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}

// 用户注册
const register = async (ctx) => {
  console.log('注册：：：，', ctx.request.body);
  const { username, password } = ctx.request.body
  try {
    const res = await findUser(username)
    log(res, 'res')
  } catch (error) {
    
  }
  // ctx.body = {
  //   code: 200,
  //   msg: '注册成功',
  //   success: true,
  //   data: {
  //     name: 'register'
  //   }
  // }
}

module.exports = {
  testApi,
  register
}