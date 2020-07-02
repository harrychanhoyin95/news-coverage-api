import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model('User', User);
