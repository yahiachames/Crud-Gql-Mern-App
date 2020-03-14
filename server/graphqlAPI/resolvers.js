const Users = require("../models/userSchema");
const mongoose = require("mongoose");

var resolvers = {
  Query: {
    users: async () =>
      await Users.find({}, (err, res) => {
        if (err) return err;
        else return res;
      })
  },
  Mutation: {
    initUser: () => {
      var user = new Users({
        name: "test1",
        email: "test1@hotmail.com",
        age: 25
      });
      user.save({}, (err, res) => {
        if (err) return err;
        else return res;
      });
    },
    addUser: async (_, args) => {
      var user = new Users({
        name: args.name,
        email: args.email,
        age: args.age
      });
      return await user.save();
    },
    deleteUser: async (_, args) => {
      return await Users.findOneAndDelete({
        _id: args.id
      });
    },
    updateUser: async (_, args) => {
      var newData = {};
      if (args.name) Object.assign(newData, { name: args.name });
      if (args.email) Object.assign(newData, { email: args.email });
      if (args.age) Object.assign(newData, { age: args.age });

      console.log(newData);
      return await Users.findOneAndUpdate(
        {
          _id: args.id
        },
        newData
      );
    }
  }
};
module.exports = resolvers;
