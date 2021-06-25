import * as graphql from 'graphql'
import getMemberList from './getMemberList'
import getSafeQuestionList from './getSafeQuestionList'
import getHuoyuanLevelList from './getHuoyuanLevelList'
import getSingleMember from './getSingleMember'
import getSingleHuoyuanInfo from './getSingleHuoyuanInfo'
import getHuoyuanTypeList from './getHuoyuanTypeList'
import getHuoyuanInfoList from './getHuoyuanInfoList'
import getMessageList from './getMessageList'
import getWeixinInfoList from './getWeixinInfoList'
import getSingleWeixinInfo from './getSingleWeixinInfo'
import getArticleList from './getArticleList'
import getSingleArticle from './getSingleArticle'

var Query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    getMemberList,
    getSafeQuestionList,
    getHuoyuanLevelList,
    getSingleMember,
    getSingleHuoyuanInfo,
    getHuoyuanTypeList,
    getHuoyuanInfoList,
    getMessageList,
    getWeixinInfoList,
    getSingleWeixinInfo,
    getArticleList,
    getSingleArticle
  }
})
export default Query
