//  安全问题表 

import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull, HasMany} from 'sequelize-typescript'
import { Member } from "./Member"
@Table({tableName: 'safe_question'})
export class SafeQuestion extends Model<SafeQuestion> {

  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: number

  // 问题
  @AllowNull(false)
  @Column
  question: string

  @Column(DataType.JSON)
  meta: any

  @HasMany(() => Member)
  members: Member[];
  
}
