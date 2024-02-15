import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: Number,
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
  isactive: {
    type: Number,
    default: 1,
  },
  profile: {
    type: String,
    data: Buffer,
    required: true,
  },
  teacherData: {
    type: Schema.Types.ObjectId,
    ref: "accounts"
  }
});

export default mongoose.model("students", studentModel);
