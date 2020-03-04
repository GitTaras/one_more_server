import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const MessagesSchema = mongoose.Schema(
  {
    message: {
      type: String,
        required: true,
    },
  },
  { timestamps: { createdAt: true } },
  { versionKey: false },
);

MessagesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Messages', MessagesSchema);