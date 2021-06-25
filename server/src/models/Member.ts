// 会员表

import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull, BelongsTo, ForeignKey, Default, HasMany } from 'sequelize-typescript'
import { SafeQuestion } from "./SafeQuestion"
import { Message } from "./Message"
import { saltedPassword } from '../utils/common'

@Table({tableName: 'member'})
export class Member extends Model<Member> {

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

  // 用户名，用于登录,验证唯一性，注册后无法修改
  @AllowNull(false)
  @Column
  account: string

  // 会员昵称
  @AllowNull(false)
  @Column
  name: string

  // 密码
  @AllowNull(false)
  @Column
  get password(): string {
    return this.getDataValue('password')
  }
  set password(value: string) {
    this.setDataValue('password', saltedPassword(value))
  }

  // 性别：1 男  2 女 0 保密
  @Default(0)
  @AllowNull(false)
  @Column
  sex: number
  
  // 排名 通过充值额或者。。。来增加排名
  @Default(0)
  @AllowNull(false)
  @Column
  rank: number

  // 账号余额 在发布的货源或者微信 审核通过才扣款
  @Default(10)
  @AllowNull(false)
  @Column
  money: string

  // 安全问题 每次修改本表任何信息 都需要验证安全问题(包括设置新安全问题，验证成功旧的才可修改成功)
  @ForeignKey(() => SafeQuestion)
  @AllowNull(false)
  @Column
  safe_question_id: number

  // 安全问题回答
  @AllowNull(false)
  @Column
  safe_answer: string

  // 电话
  @AllowNull(true)
  @Column
  telephone: string

  // 最后登录时间 活跃时间
  @AllowNull(false)
  @Column
  last_login_time: Date

  // 登录ip 用于区分地区
  @AllowNull(true)
  @Column
  last_login_ip: string

  // 头像地址
  @AllowNull(true)
  @Column
  avatar_url: string

  @Column(DataType.JSON)
  meta: any

  @BelongsTo(() => SafeQuestion)
  safeQuestion: SafeQuestion

  @HasMany(() => Message)
  messages: Message[]

}
