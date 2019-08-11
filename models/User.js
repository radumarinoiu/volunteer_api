const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  }
});

UserSchema.plugin(timestamps);

module.exports = mongoose.model("User", UserSchema);
