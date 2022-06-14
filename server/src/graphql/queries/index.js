const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const User = require("../../models/User");
const UserType = require("./UserType");

const BlogQueryRootType = new GraphQLObjectType({
  name: "BlogAppSchema",
  description: "Blog Application Schema Query Root",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of all Users",
      resolve: async function (root, params, req) {
        if (!req.userid) {
          return "login_required";
        }
        return await User.find({}, (err, auth) => {});
      }
    },
    meUser: {
      type: UserType,
      description: "My portfolio",
      resolve: async function (root, params, req) {
        if (!req.userid) {
          return "login_required";
        }
        return await User.findOne({ _id: req.userid }, (err, auth) => {});
      }
    },
    getUser: {
      type: UserType,
      args: {
        id: {
          name: "id",
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      description: "Portfolio by id",
      resolve: async function (root, params, req) {
        if (!req.userid) {
          return "login_required";
        }
        return await User.findOne({ _id: params.id }, (err, auth) => {});
      }
    }
  })
});

module.exports = BlogQueryRootType;
