const crypto = require('crypto')
const { passwordSalt } = require('../config')

function saltedPassword (password: string, salt: string = passwordSalt) {
  function _sha1 (s: string) {
    const algorithm = 'sha1'
    const hash = crypto.createHash(algorithm)
    hash.update(s)
    const h = hash.digest('hex')
    return h
  }
  const hash1 = _sha1(password)
  const hash2 = _sha1(hash1 + salt)
  return hash2
}

export { saltedPassword }
