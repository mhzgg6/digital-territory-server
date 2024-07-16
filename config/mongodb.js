const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost:27017/digtal', 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }
)

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