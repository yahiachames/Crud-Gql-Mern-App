const Users = require("../models/userSchema");

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
    }
  }
};
module.exports = resolvers;