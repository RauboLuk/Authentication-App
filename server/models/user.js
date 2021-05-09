const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// required: [true, "Please enter an email"],
const userSchema = new mongoose.Schema({
  name: String,
  bio: String,
  phone: String,
  email: {
    type: String,
    trim: true,
    minlength: 3,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [5, "Minimum password length is 5 characters"],
  },
  img: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  oauth: String,
});

userSchema.pre("save", async function (next) {
  if (this.oauth) {
    next();
  }
  if (this._keepPassword) {
    delete this._keepPassword;
    next();
  }
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else throw new Error("incorrect password");
  } else throw new Error("incorrect email");
};

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.password;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("user", userSchema);
