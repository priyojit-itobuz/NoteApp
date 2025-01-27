import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique : true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  accessToken : {
    type : String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("user", userModel);
