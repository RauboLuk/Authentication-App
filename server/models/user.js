const mongoose = require("mongoose");
const { isEmail } = require("validator");
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
    required: [true, "Please enter an email"],
    unique: true,
    minlength: 3,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  passwordHash: {
    type: String,
    required: [true, "Please enter a password"],
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    // expires: 300,
    default: Date.now(),
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
