import config from '../config'
import * as path from 'path'
import * as log4js from 'log4js'

log4js.configure({
  appenders: {
    app: {
      type: 'dateFile',
      filename: path.join(config.log_dir, '/app.log'),
      pattern: '-yyyy-MM-dd'
    },
    console: { type: 'console' }
  },
  categories: { default: { appenders: ['console', 'app'], level: 'DEBUG' } }
})

const logger: any = log4js.getLogger()

export default logger
