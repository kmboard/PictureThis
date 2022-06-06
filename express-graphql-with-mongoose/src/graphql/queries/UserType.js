const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require("graphql");
const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "This represent an user",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    contact_info: { type: GraphQLString },
    profilePic: { type: GraphQLString },
    tagline: { type: GraphQLString },
    desription: { type: GraphQLString }
  })
});

module.exports = UserType;
