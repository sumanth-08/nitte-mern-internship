import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userModel = new Schema({
  teachername: {
    type: String,
    unque: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 2,
  },
  isactive: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("accounts", userModel);
