module.exports = {
  BASE_CONFIG: {
    key: "appletSystem:sess", // cookie的key,(默认是:koa:sess)
    maxAge: 1000, // session过期时间
    autoCommit: true, // 自动提交到响应头，(默认是true)
    overwrite: true, // 是否允许重写
    httpOnly: false, // cookie是否只有服务端可以访问
    signed: false, // 是否签名
    rolling: true, // 是否每次响应时重写刷新session的有效期
    renew: false, // 是否在session快过期时刷新session的有效期 默认false
  },
  SIGNED_KEY: ["appletSystem"]
}