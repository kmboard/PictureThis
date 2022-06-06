const { GraphQLNonNull, GraphQLString } = require("graphql");
const UserType = require("../queries/UserType");
const User = require("../../models/User");

const addUser = {
  type: UserType,
  args: {
    name: {
      name: "name",
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      name: "email",
      type: new GraphQLNonNull(GraphQLString)
    },
    contact_info: {
      name: "contact_info",
      type: new GraphQLNonNull(GraphQLString)
    },
    profilePic: {
      name: "profilePic",
      type: new GraphQLNonNull(GraphQLString)
    },
    tagline: {
      name: "tagline",
      type: new GraphQLNonNull(GraphQLString)
    },
    desription: {
      name: "desription",
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async function (root, params) {
    const uModel = new User(params);
    const newUser = await uModel.save();
    if (!newUser) {
      throw new Error("Error");
    }
    return newUser;
  }
};

module.exports = { addUser };
