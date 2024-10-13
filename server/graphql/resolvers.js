const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/auth");

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      return await User.findById(user.id);
    },
  },
  Mutation: {
    register: async (_, { username, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      return newUser;
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }
      return generateToken(user);
    },
  },
};

module.exports = resolvers;
