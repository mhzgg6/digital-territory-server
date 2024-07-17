const mongoose = require('mongoose')
// const db = mongoose.connect('mongodb://localhost:27017/test',
// 127.0.0.1 
mongoose.connect('mongodb://127.0.0.1:27017/digital')
mongoose.Promise = global.Promise
const db = mongoose.connection
const Schema = mongoose.Schema

db.on('error', () => {
  console.log('连接数据库失败')
})
db.on('open', () => {
  console.log('连接数据库成功')
})

module.exports = {
  db,
  Schema
}