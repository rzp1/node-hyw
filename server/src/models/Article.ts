// 文章表

import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull, Default} from 'sequelize-typescript'

@Table({tableName: 'article'})
export class Article extends Model<Article> {

  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: number
  // 发布时间
  @CreatedAt
  @AllowNull(false)
  @Column
  createdAt: Date

  @UpdatedAt
  @AllowNull(false)
  @Column
  updatedAt: Date
  
  @AllowNull(false)
  @Column
  member_id: number

  // 类型id  id为0时为帮助中心文章
  @AllowNull(false)
  @Column
  type_id: number

  // 标题
  @AllowNull(false)
  @Column
  title: string

  // 内容
  @AllowNull(false)
  @Column(DataType.TEXT)
  content: any

  // 摘要
  @AllowNull(true)
  @Column
  abstract: string

  // 封面
  @AllowNull(false)
  @Column
  cover_img: string

  // 热度或人气 点击一次增加1
  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  popularity: number
  
  // 是否上推荐 1 未上推荐  2 微商学院首页推荐
  @Default(1)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  is_recommended: number

  // 审核是否通过，通过才显示 1 未审核 2 审核通过 3 驳回 重新填写提交
  @Default(1)
  @AllowNull(false)
  @Column
  is_checked: number

  @Column(DataType.JSON)
  meta: any
  
}
