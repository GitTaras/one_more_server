import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const MessageSchema = mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    hashtags: {
      type: [Schema.Types.String],
      default: [],
    },
  },
  { timestamps: { createdAt: true } },
  { versionKey: false },
  { virtual: true }
);

MessageSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

MessageSchema.plugin(mongoosePaginate);

class Message {}

function autoPopulate() {
  this.populate('author', { username: true, email: true, fullName: true });
}

MessageSchema.pre('find', autoPopulate);
MessageSchema.pre('findOne', autoPopulate);

MessageSchema.post('save', function(doc, next) {
  doc
    .populate('author', { username: true, email: true, fullName: true })
    .execPopulate()
    .then(function () {
      next();
    });
});

MessageSchema.loadClass(Message);

export default mongoose.model('Messages', MessageSchema);
