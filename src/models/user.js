import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    salt: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
