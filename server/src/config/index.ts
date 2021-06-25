import * as path from 'path'
import * as jwt from 'jsonwebtoken'

const secretKey: string = 'hyw'
const passwordSalt = 'hyw'
const jwtVerify = (token: string, key: string = secretKey): any => {
  return jwt.verify(token, key)
}

const config: any = {
  host: 'http://127.0.0.1',
  // 打印路径
  log_dir: path.join(__dirname, '../../logs'),
  // 程序运行的端口
  port: 3001,
  file_limit: '10MB',
  secretKey,
  jwtVerify,
  passwordSalt
}

export default config
