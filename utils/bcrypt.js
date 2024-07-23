const bcrypt = require('bcrypt')

module.exports = {
  create_bcrypt(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  },
  check_bcrypt(password, hash) {
    return bcrypt.compareSync(password, hash)
  }
}