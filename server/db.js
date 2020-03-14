const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/UsersCrud", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () =>
  console.log(`Connected to mongo at ${"mongodb://localhost:27017/UsersCrud"}`)
);
