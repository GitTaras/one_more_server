import mongoose from 'mongoose';

const MessagesSchema = mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    // },
    message: {
      type: String,
        required: true,
    },
  },
  { timestamps: { createdAt: true } },
  { versionKey: false },
);

module.exports = mongoose.model('Messages', MessagesSchema);