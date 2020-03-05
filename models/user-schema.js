import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: true,
    },
    email: {
      type: String,
      minlength: 6,
      maxlength: 30,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: { createdAt: true } },
  { versionKey: false },
);

class User {}
UserSchema.loadClass(User);


export default mongoose.model('Users', UserSchema);