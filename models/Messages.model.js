import mongoose from 'mongoose';

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

module.exports = mongoose.model('Messages', MessagesSchema);