import { Sequelize } from 'sequelize-typescript'

const env: string = process.env.NODE_ENV || "development"
const config: any = require(__dirname + "/../src/config/database.json")[env]

config.operatorsAliases = false
const sequelize: any = new Sequelize(config)

sequelize.addModels([__dirname + '/models/*.js'])

export default sequelize