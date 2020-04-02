import mongoose from 'mongoose';

const { Schema } = mongoose;

const HashTagSchema = Schema(
  {
    hashtag: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
  },
  { timestamps: { createdAt: true } },
  { versionKey: false },
  { virtual: true }
);

export default mongoose.model('HashTags', HashTagSchema);
