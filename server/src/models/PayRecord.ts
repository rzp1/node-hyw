// 充值记录表

import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull} from 'sequelize-typescript'

@Table({tableName: 'pay_record'})
export class PayRecord extends Model<PayRecord> {

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

  // 会员id
  @AllowNull(false)
  @Column
  member_id: number

  // 会员账号
  @AllowNull(false)
  @Column
  member_account: string

  // 类型 1 微商货源 2 微信大全
  @AllowNull(false)
  @Column
  title: number

  // 推荐类型 0 充值 （微商货源 1 首页精品推荐 2 首页所在分类展示 3 顶部滚动展示 4 货源详情页右侧推荐）  （微信大全 1 微信详情页相关分类推荐）
  @AllowNull(false)
  @Column
  recommended_type: number

  // 推荐金额
  @AllowNull(false)
  @Column
  money: string

  // 支付凭证 支付截图
  @AllowNull(false)
  @Column
  pay_introduction: string

  // 备注
  @AllowNull(true)
  @Column
  remark: string

  @Column(DataType.JSON)
  meta: any
  
}
