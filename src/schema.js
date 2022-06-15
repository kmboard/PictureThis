const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const mutation = require("./graphql/mutations/index");
const PortfolioQueryRootType = require("./graphql/queries/index");

const PortfolioAppSchema = new GraphQLSchema({
  query: PortfolioQueryRootType,
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: mutation
  })
});

module.exports = PortfolioAppSchema;
