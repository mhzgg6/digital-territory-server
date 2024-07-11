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

module.exports = {
  testApi
}