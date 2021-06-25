import * as express from 'express'
import logger from '../libs/logger'
import config from '../config'

const fs = require('fs')
const multer = require('multer')

const image: any = express.Router()

// 配置 multer 模块
// dest 表示文件上传之后保存的路径
var limits = { fileSize: 5 * 1024 * 1024 }
const SingleUpload = multer({
  dest: 'images/img',
  limits
})

// 上传图片
image.post('/upload/single_img',  SingleUpload.single('single_img'), async (req: any, res: any) => {
  try {
    const file = req.file
    let img_url = `${config.host}:${config.port}/img/${file.filename}`
    res.json({ code: 0, message: '上传成功', img_url })
  } catch (e) {
    logger.error('upload img error', e)
    res.json({ code: 1, message: '上传失败' })
  }
})

// 上传富文本编辑器图片
image.post('/upload/richTextImg', async (req: any, res: any) => {
  try {
    let imgData = req.body.imgData
    //过滤data:URL
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, '')
    let dataBuffer = Buffer.from(base64Data, 'base64')
    let filename = new Date().getTime()
    let img_url = `${config.host}:${config.port}/rich_text_img/${filename}.png`
    fs.writeFile(`images/rich_text_img/${filename}.png`, dataBuffer, (err: any) => {
      if (err) {
        res.json({ code: 1, message: '上传失败' })
      } else {
        res.json({ code: 0, message: '上传成功', img_url})
      }
    })
  } catch (e) {
    logger.error('upload rich_text_img error', e)
    res.json({ code: 1, message: '上传失败' })
  }
})

export default image
