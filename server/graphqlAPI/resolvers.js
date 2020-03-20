const Users = require("../models/userSchema");
const mongoose = require("mongoose");
const { PubSub } = require("apollo-server-express");
const pubsub = new PubSub();
const USER_IS_CHANGED = "USER_IS_CHANGED";

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
        age: 25,
        imgLink:
          "https://scontent.ftun2-1.fna.fbcdn.net/v/t1.0-9/p960x960/89149177_2692422090987121_484992160945405952_o.jpg?_nc_cat=109&_nc_sid=85a577&_nc_ohc=vtG0mysb5FgAX-ouKYD&_nc_ht=scontent.ftun2-1.fna&_nc_tp=6&oh=6c3265a919fe420128bcc112db491295&oe=5E968367"
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
        age: args.age,
        imgLink: args.imgLink
      });
      pubsub.publish(USER_IS_CHANGED, { userIsChanged: args });
      return await user.save();
    },
    deleteUser: async (_, args) => {
      const deletedUser = Users.findOneAndDelete({
        _id: args.id
      });
      pubsub.publish(USER_IS_CHANGED, { userIsChanged: deletedUser });
      console.log(deletedUser);
      return deletedUser;
    },
    updateUser: async (_, args) => {
      var newData = {};
      if (args.name) Object.assign(newData, { name: args.name });
      if (args.email) Object.assign(newData, { email: args.email });
      if (args.age) Object.assign(newData, { age: args.age });
      if (args.imgLink) Object.assign(newData, { imgLink: args.imgLink });

      pubsub.publish(USER_IS_CHANGED, { userIsChanged: args });
      return await Users.findOneAndUpdate(
        {
          _id: args.id
        },
        newData
      );
    }
  },
  Subscription: {
    userIsChanged: {
      subscribe: () => pubsub.asyncIterator([USER_IS_CHANGED])
    }
  }
};
module.exports = resolvers;
