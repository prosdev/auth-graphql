const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID
} = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    stubField: { type: GraphQLID }
  }
});

module.exports = RootQueryType;
