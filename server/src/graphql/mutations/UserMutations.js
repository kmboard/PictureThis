const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const UserType = require("../queries/UserType");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const registerUser = {
  type: UserType,
  args: {
    email: {
      name: "email",
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      name: "password",
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async function (root, params) {
    const hashedPWD = await bcrypt.hash(params.password, 13);
    const uModel = new User({ email: params.email, password: hashedPWD });
    const newUser = await uModel.save();
    if (!newUser) {
      throw new Error("Error");
    }
    return { email: newUser.email };
  }
};

const loginUser = {
  type: UserType,
  args: {
    email: {
      name: "email",
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      name: "password",
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async function (root, params) {
    const user = await User.findOne({ email: params.email }).lean();
    if (!user) {
      throw new Error("No user with that email");
    }
    const isValid = await bcrypt.compare(params.password, user.password);
    if (!isValid) {
      throw new Error("Incorrect password");
    }
    const token = jsonwebtoken.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return {
      token,
      user
    };
  }
};

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
    description: {
      name: "description",
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

const updateUser = {
  type: UserType,
  args: {
    name: {
      name: "name",
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      name: "description",
      type: new GraphQLNonNull(GraphQLString)
    },
    files: {
      name: "files",
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString))
      )
    }
  },
  resolve: async function (root, param, req) {
    if (!req.userid) {
      return { message: "login_required" };
    }
    let updateUser = {};
    if (param.name) {
      updateUser.name = param.name;
    }
    if (param.description) {
      updateUser.description = param.description;
    }
    if (param.files) {
      updateUser.files = param.files;
    }

    const updateUserInfo = await User.findByIdAndUpdate(
      req.userid,
      updateUser,
    );

    if (!updateUserInfo) {
      throw new Error("Error");
    }
    return updateUserInfo;
  }
};

const deleteUser = {
  type: UserType,
  args: {

  },
  resolve: async function (root, param, req) {
    if (!req.userid) {
      return { message: "login_required" };
    }
    const deleteUser = await User.findByIdAndRemove(req.userid);
    if (deleteUser) {
      throw new Error("Error");
    }
    return deleteUser;
  }
};

module.exports = { loginUser, registerUser, addUser, updateUser, deleteUser };
