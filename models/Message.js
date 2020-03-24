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
    hashtags: {
      type: [Schema.Types.String],
      default: []
    },
  },
  { timestamps: { createdAt: true } },
  { versionKey: false },
  {virtual: true}
);

MessageSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    delete ret._id;
  }
});

MessageSchema.plugin(mongoosePaginate);

class Message {}
MessageSchema.loadClass(Message);

export default mongoose.model('Messages', MessageSchema);