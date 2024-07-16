const { Schema }  = require('../config/mongodb')

// 用户表
const UserSchema = new Schema({
  username: String,
  password: String,
  // email: String,
  // phone: String,
  // create_time: {
  //   type: Date,
  //   default: Date.now
  // },
  // update_time: {
  //   type: Date,
  //   default: Date.now
  // }
})

module.exports = UserSchema