const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const viewerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  inputName: {
    type: String,
    required: true,
  },
  inputEmail: {
    type: String,
    required: true,
  },
  inputAttendence: {
    type: String,
    required: true,
  },
  inputDate: {
    type: String,
    required: true,
  },
  inputTime: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});



//hashing Password
viewerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

//Generate token using middleware
viewerSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};


const Viewer = mongoose.model("VIEWER", viewerSchema);
module.exports = Viewer;