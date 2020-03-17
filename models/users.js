import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate";

const Schema = mongoose.Schema;

const Users = mongoose.Schema(
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
      dropDups: true,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Messages' }]
  },
  { timestamps: { createdAt: true } },
  { versionKey: false },
);

class User {}
Users.loadClass(User);


export default mongoose.model('Users', Users);