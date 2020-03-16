import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const MessageSchema = mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId, ref: 'Users',
      required: true,
    },
    message: {
      type: String,
        required: true,
    },
  },
  { timestamps: { createdAt: true } },
  { versionKey: false },
);

MessageSchema.plugin(mongoosePaginate);

class Message {}
MessageSchema.loadClass(Message);

export default mongoose.model('Messages', MessageSchema);