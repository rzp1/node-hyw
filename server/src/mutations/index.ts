import * as graphql from 'graphql'
import addHuoyuanLevel from './addHuoyuanLevel'
import deleteHuoyuanLevel from './deleteHuoyuanLevel'
import updateHuoyuanLevel from './updateHuoyuanLevel'
import addHuoyuanInfo from './addHuoyuanInfo'
import updateHuoyuanInfo from './updateHuoyuanInfo'
import updateField from './updateField'
import updateMember from './updateMember'
import addWeixinInfo from './addWeixinInfo'
import deleteMessage from './deleteMessage'
import updateWeixinInfo from './updateWeixinInfo'
import deleteArticle from './deleteArticle'

var Mutation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addHuoyuanLevel,
    deleteHuoyuanLevel,
    updateHuoyuanLevel,
    addHuoyuanInfo,
    updateHuoyuanInfo,
    updateField,
    updateMember,
    addWeixinInfo,
    deleteMessage,
    updateWeixinInfo,
    deleteArticle
  }
})
export default Mutation
