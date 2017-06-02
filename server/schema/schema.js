const _ = require('lodash');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const RootQueryType = require('./rootQueryType');
const mutation = require('./mutations');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation
});
