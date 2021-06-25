// 微信大全表

import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull, Default } from 'sequelize-typescript'

@Table({tableName: 'weixin_info'})
export class WeixinInfo extends Model<WeixinInfo> {

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

  // 类型 1 个人微信号 2 微信公众号 3 微信群号
  @AllowNull(false)
  @Column
  type_id: number

  // 标题
  @AllowNull(false)
  @Column
  title: string

  // 简介
  @AllowNull(false)
  @Column(DataType.TEXT)
  introduction: string
  
  // 微信二维码
  @AllowNull(false)
  @Column
  weixin_qrcode: string

  // 微信号
  @AllowNull(false)
  @Column
  weixin_num: string

  // 人气或点击量 点击一次增加1
  @Default(0)
  @AllowNull(false)
  @Column
  popularity: number

  // 状态 1 未支付 2 支付成功（未审核） 4 驳回（重新编辑 ） 8 审核通过
  @Default(1)
  @AllowNull(false)
  @Column
  status: number

  // 是否上推荐,1或者空为未上任何推荐 2 首页精品推荐 3 首页所在分类展示 4 顶部滚动展示 5 货源详情页右侧推荐
  @Default(1)
  @AllowNull(true)
  @Column
  recommended_type: number

  // 过期时间
  @AllowNull(true)
  @Column
  expri_time: Date

  // 是否删除 0或者空为未删除 1为已删除 总后台回收站展示
  @Default(0)
  @AllowNull(true)
  @Column
  is_delete: number

  @Column(DataType.JSON)
  meta: any
  
}
