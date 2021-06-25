//  货源类型表 

import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull, HasMany, Default} from 'sequelize-typescript'
import { HuoyuanInfo } from "./HuoyuanInfo"

@Table({tableName: 'huoyuan_type'})
export class HuoyuanType extends Model<HuoyuanType> {

  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: number

  // 类型名称
  @AllowNull(false)
  @Column
  name: string

 // 是否上推荐 2 表示上首页
  @Default(1)
  @AllowNull(true)
  @Column
  is_recommend: number
  
  @Column(DataType.JSON)
  meta: any
  
  @HasMany(() => HuoyuanInfo)
  huoyuanInfos: HuoyuanInfo[]
}
