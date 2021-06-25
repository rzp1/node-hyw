//  安全问题表 

import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull, BelongsTo, ForeignKey, Default} from 'sequelize-typescript'
import { Member } from "./Member"
@Table({tableName: 'message'})
export class Message extends Model<Message> {

  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: number

  @CreatedAt
  @AllowNull(false)
  @Column
  createdAt: Date

  @UpdatedAt
  @AllowNull(false)
  @Column
  updatedAt: Date
  
  // 内容
  @AllowNull(false)
  @Column
  content: string

  @ForeignKey(() => Member)
  @AllowNull(false)
  @Column
  member_id: number

  @Column(DataType.JSON)
  meta: any

  @BelongsTo(() => Member)
  Member: Member
  
}
