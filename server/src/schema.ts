import * as graphql from 'graphql'
import Query from './queries'
import Mutation from './mutations'


var schema = new graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
})
export default schema