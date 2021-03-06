import mongoose from 'mongoose';
import crypto from 'crypto';

const { Schema } = mongoose;

const UserSchema = Schema(
  {
    avatar: {
      type: String,
    },
    username: {
      type: String,
      minlength: 2,
      maxlength: 30,
      index: true,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      minlength: 6,
      maxlength: 30,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
  },
  { timestamps: { createdAt: true } },
  { versionKey: false }
);

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    if (!ret.avatar) {
      const hash = crypto.createHash('md5').update(ret.email).digest('hex');
      ret.avatar = `https://www.gravatar.com/avatar/${hash}?s=200&d=retro`;
    }
    delete ret._id;
    delete ret.password;
  },
});

class User {}

UserSchema.loadClass(User);

export default mongoose.model('Users', UserSchema);
