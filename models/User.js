import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import crypto from 'crypto';

const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
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

UserSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
      const hash = crypto.createHash('md5').update(ret.email).digest("hex");
      ret.avatar = `https://www.gravatar.com/avatar/${hash}?s=200&d=retro`;
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.password;
      delete ret.__v;
      delete ret._id;
      delete ret.messages;
    }
});

class User {
  static async create(userData) {
    userData.username = `${userData.firstName} ${userData.lastName}`;
    userData.password = await bcrypt.hash(userData.password, await bcrypt.genSalt(8));
    const user = new this(userData);
    return await user.save();
  }

  async isEqualsPasswords(password) {
    return await bcrypt.compare(password, this.password);
  }
}

UserSchema.loadClass(User);


export default mongoose.model('Users', UserSchema);