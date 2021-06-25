// 文章类型表

import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull} from 'sequelize-typescript'

@Table({tableName: 'article_type'})
export class ArticleType extends Model<ArticleType> {

  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: number

  // 类型名称
  @AllowNull(false)
  @Column
  name: string

  @Column(DataType.JSON)
  meta: any
  
}
