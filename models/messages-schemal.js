import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const MessageSchema = mongoose.Schema(
  {
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