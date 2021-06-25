import * as express from 'express'
// Node.js 压缩中间件
import * as compress from 'compression'
import * as bodyParser from 'body-parser'
import * as graphqlHTTP from 'express-graphql'

import './sequelize'
import schema from './schema'

// 引入配置文件
import config from './config/index'
import logger from './libs/logger'
// 请求打印控制器
// import requestLog from './middlewares/request_log'
// import validate from './middlewares/validate'
// 登录注册
import registerLogin from './controllers/register_login'
// 图片上传
import image from './controllers/image'
// 支付扣款
import pay from './controllers/pay'

const app: any = express()

app.use(function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-HTTP-Method-Override, talk, X-Token, smail, Content-Type, Content-Length, X-Requested-With, Accept,Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, hyw-from')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

// 打印请求的时间, 路径, 来源IP, 并在请求结束时打印响应状态, 耗时
// app.use(requestLog)
// 判断请求是否带有openId, 并在req中加入对应userId
// app.use(validate)

// 控制请求的body的最大值
app.use(bodyParser.json({limit: '10mb'}))
// 使用qs库解析url
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
// 压缩
app.use(compress())

// 图片挂载
app.use(express.static('images'))
app.use(express.static('images/article_img'))

// 登陆注册
app.use('/api/registerLogin', registerLogin)

// token验证
const validateJwt = (req: any, res: any, next: any) => {
  let validate = (token: string) => {
    try {
      let validatedData = config.jwtVerify(token, 'hyw')
      req.memberInfo = validatedData
      next()
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        logger.error('token过期')
        res.json({code: 401, message: 'token过期'})
      } else {
        logger.error('token验证错误', e)
        res.json({code: 403, message: 'token验证错误'})
      }
    }
  }
  try {
    req.hywFrom = `${req.headers['hyw-from']}`
  } catch (error) {
    //
  } 
  if (req.headers.referer && req.headers.referer.indexOf('register') > 0 && req.url.split('?')[0] === '/graphql') {
    // 会员注册页面用graphql获取安全问题，无需验证token
    next()
  } else if(req.headers['hyw-from'] === 'member') {
    // 是否需要验证token
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      let token = req.headers.authorization.split(' ')[1]
      validate(token)
    } else if (req.query && req.query.token) {
      let token = req.query.token
      validate(token)
    } else if (req.body && req.body.token) {
      let token = req.body.token
      validate(token)
    } else {
      res.json({code: 1, message: '请求需要带上token'})
    }
  } else { 
    next()
  }
}
app.use(validateJwt)

// 如果是生产环境则返回服务器错误状态500
app.use(function (err: any, req: any, res: any, next: any) {
	logger.error(err)
	return res.status(500).send('500 status')
})

app.use('/api/image', image)
app.use('/api/pay',pay)
app.use('/graphql', (req: any, res: any) => {
  return graphqlHTTP({
    schema,
    graphiql: true,
    context: { req, res }
  })(req, res)
})

const server = app.listen(config.port, function () {
	logger.info('chat listening on port', config.port)
})

export { server }
