import * as express from 'express'
import logger from '../libs/logger'
import { Member } from '../models/Member'
import sequelize from '../sequelize'
import { HuoyuanInfo } from '../models/HuoyuanInfo'
import { WeixinInfo } from '../models/WeixinInfo'

const Decimal = require('decimal.js-light')
const pay: any = express.Router()

// 支付
pay.post('/order_pay', async (req: any, res: any) => {
  try {
    let id: number = req.memberInfo.id
    let weixin_id: number = req.body.weixin_id
    let huoyuan_id: number = req.body.huoyuan_id
    let money: number = req.body.money
    let t: any = await sequelize.transaction()
    if (!weixin_id && !huoyuan_id || !money) {
      await t.rollback()
      return res.json({ code: 1, message: '参数错误'})
    }
    try {
      let member = await Member.findById(id)
      let rawMoney: any = member.money
      if (Number(rawMoney) < money) {
        await t.rollback()
        return res.json({code: 2, message: '余额不足，请先充值'})
      }
      if (weixin_id) {
        let weixin_info = await WeixinInfo.findById(weixin_id)
        if (!weixin_info) {
          await t.rollback()
          return res.json({code: 1, message: '该微信信息不存在'})
        }
        await WeixinInfo.update({
          status: 2
        }, {
          where: {
            id: weixin_id
          },
          transaction: t
        })
      }
      if (huoyuan_id) {
        let huoyuan_info = await HuoyuanInfo.findById(huoyuan_id)
        if (!huoyuan_info) {
          await t.rollback()
          return res.json({code: 1, message: '该货源信息不存在'})
        }
        await HuoyuanInfo.update({
          status: 2
        }, {
          where: {
            id: huoyuan_id
          },
          transaction: t
        })
      }
      rawMoney = new Decimal(rawMoney)
      let newMoney = rawMoney.minus(new Decimal(money))
      newMoney = newMoney.toString()
      await Member.update({
        money: newMoney
      }, {
        where: {
          id: id
        },
        transaction: t
      })
      await t.commit()
      return res.json({code: 0, message: '支付成功'})
    } catch (error) {
      await t.rollback()
      logger.error('getMemberInfo error', error)
      return res.json({code: 1, message: '获取会员信息失败'})
    }
  } catch (e) {
    logger.error('order pay error', e)
  }
})

// 退款
pay.post('/order_refund', async (req: any, res: any, next: any) => {
  try {
   
  } catch (e) {
    logger.error('order refund error', e)
  }
})

export default pay
