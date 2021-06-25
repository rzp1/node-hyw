// 货源等级表 

import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull} from 'sequelize-typescript'

@Table({tableName: 'huoyuan_level'})
export class HuoyuanLevel extends Model<HuoyuanLevel> {

  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: number

  // 等级名称 比如一个月，三个月
  @AllowNull(false)
  @Column
  name: string

  // 等级所需价格
  @AllowNull(false)
  @Column
  money: string

  // 等级所得到的时间  毫秒数 
  @AllowNull(false)
  @Column
  time: number

  @Column(DataType.JSON)
  meta: any
  
}
