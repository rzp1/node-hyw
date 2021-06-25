import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { Member } from '../models/Member'
import logger from '../libs/logger'
import { Sequelize } from 'sequelize-typescript'
import { saltedPassword } from '../utils/common'
const svgCaptcha = require('svg-captcha')
const { secretKey } = require('../config')

const Op = Sequelize.Op
const registerLogin: any = express.Router()
interface registerInterface {
  account: string,
  name: string,
  password: string,
  sex: number,
  safe_question_id: number,
  safe_answer: string,
  telephone: string
}
interface loginInterface {
  account: string,
  password: string
}

interface tokenInterface {
  account: string,
  id: number
}

registerLogin.post('/register', async (req: any, res: any) => {
  try {
    let body: registerInterface = req.body
    let { account, name, password, sex, safe_question_id, safe_answer, telephone } = body
    let exit = await Member.findOne({
     where: {
       account
     }
    })
    if (exit) {
      return res.json({ code: 1, message: '该用户名已存在'})
    }
    let last_login_ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.ip
    last_login_ip = last_login_ip.split('::ffff:')[1]
    let obj = {
      account,
      name,
      password,
      sex,
      safe_question_id,
      safe_answer,
      last_login_ip,
      last_login_time: new Date()
    }
    if (telephone) {
      Object.assign(obj, {
        telephone
      })
    }
    await Member.create(obj)
    return res.json({ code: 0, message: '注册成功' })
  } catch (error) {
    logger.error('register error', error)
    return res.json({ code: 1, message: 'register error' })
  }
})

registerLogin.post('/login', async (req: any, res: any) => {
  try {
    let body: loginInterface = req.body
    let { account, password } = body
    let member = await Member.findOne({
      where: {
        account
      }
    })
    if (!member) {
      return res.json({code: 2, message: '该用户不存在'})
    }
    let pawd = member.password
    let newPawd = saltedPassword(password)
    if (pawd !== newPawd) {
      return res.json({code: 1, message: '密码不正确'})
    }
    const memberToken: tokenInterface = {
      account: member.account,
      id: member.id
    }
    try {
      await member.update({
        last_login_time: new Date()
      })
      const token: string = jwt.sign(memberToken, 'hyw', { expiresIn: '7d' })
      res.json({code: 0, token: token, message: '登录成功'})
    } catch (error) {
      logger.error('update member error', error)
    }
  } catch (error) {
    logger.error('login error', error)
    return res.json({ code: 1, message: 'login error' })
  }
})

registerLogin.get('/captcha.gif/:id', async (req: any, res: any) => {
  try {
    let ignoreChars: string = '0o1ilABCDEFGHIJKLMNOPQRSTUVWXYZft'
    var captcha: any = svgCaptcha.create({ignoreChars: ignoreChars})
    let captchaInfo = {
      text: captcha.text
    }
    let imageCaptchaToken = jwt.sign(captchaInfo, secretKey)
    let imageData = 'data:image/svg+xml;utf8,' + captcha.data
    return res.json({code: 0, data: imageData, imageCaptchaToken: imageCaptchaToken})
  } catch (e) {
    return res.json({code: 1, message: e})
  }
  // 前端调用实例
  // let res = await this.$http.get(`${this.apiUrl}/api/registerLogin/captcha.gif/${Date.now()}`)
  // let resData = res.data
  // let { code, data, imageCaptchaToken, message } = resData
  // if (code === 0) {
  //   // let image = res.data.data
  //   this.imgURL = data
  //   this.imageCaptchaToken = imageCaptchaToken
  // } else {
  //   console.error('get captcha error', message)
  // }
})

registerLogin.post('/validate/imageCaptcha', async (req: any, res: any) => {
  try {
    let {imageCaptcha, imageCaptchaToken} = req.body
    let token: any = jwt.verify(imageCaptchaToken, secretKey)
    let text: string = token.text
    imageCaptcha = imageCaptcha.toLowerCase()
    if (imageCaptcha === text) {
      res.json({code: 0, message: '验证成功'})
    } else {
      res.json({code: 1, message: '验证失败'})
    }
  } catch (e) {
    res.json({code: 1, message: e})
  }
   // 前端调用实例
  //  let data = {
  //   imageCaptcha: this.captchaForm.imageCaptcha,
  //   imageCaptchaToken: this.imageCaptchaToken
  // }
  // let res = await this.$http.post(`${this.apiUrl}/api/registerLogin/validate/imageCaptcha`, data, {withCredentials: true})
  // let resData = res.data
  // if (resData.code === 0) {
  // } else {
  //   this.tip = '图形验证错误'
  // }
})
export default registerLogin
