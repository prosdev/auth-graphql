const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;
const UserType = require('./userType');
const authService = require('../services/authService');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return authService.register({
          email,
          password,
          req
        });
      }
    }
  }
});

module.exports = mutation;
