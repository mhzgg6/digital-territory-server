const { db }  = require('../config/mongodb')
const UserSchema = require('../schema/user')
const User = db.model('user', UserSchema)
/**
 * 创建 user 表
 * @param {Object} user 用户信息
 */
module.exports = User