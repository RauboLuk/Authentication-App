const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
  },
  bio: String,
  phone: {
    type: String,
    minlength: 3,
  },
  email: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  passwordHash: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  // TODO
  // createdAt: { type: Date, expires: 300, default: Date.now() },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
