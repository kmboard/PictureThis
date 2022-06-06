const { GraphQLList, GraphQLObjectType } = require("graphql");
const User = require("../../models/User");
const UserType = require("./UserType");

const BlogQueryRootType = new GraphQLObjectType({
  name: "BlogAppSchema",
  description: "Blog Application Schema Query Root",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of all Users",
      resolve: async function () {
        return await User.find({}, (err, auth) => {});
      }
    }
  })
});

module.exports = BlogQueryRootType;
