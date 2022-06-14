const {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull
} = require("graphql");
const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "This represent an user",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    password: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    description: { type: GraphQLString },
    token: { type: GraphQLString },
    files: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLString))
    }
  })
});

module.exports = UserType;
