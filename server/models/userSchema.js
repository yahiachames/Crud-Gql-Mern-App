const mongoose = require("mongoose");
require("mongoose-type-email");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: mongoose.SchemaTypes.Email, required: true },
  age: { type: Number, required: true }
});
module.exports = mongoose.model("user", userSchema);
