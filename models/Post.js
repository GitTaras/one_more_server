import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const PostSchema = Schema(
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
    //mentions:
  },
  { timestamps: { createdAt: true } },
  { versionKey: false },
  { virtual: true }
);

PostSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

PostSchema.plugin(mongoosePaginate);

class Post {}

//todo
// remove hooks
// add method for parsing and saving hashtags
// add mentions like map(String "@username", ObjectId)

function autoPopulate() {
  this.populate('author', { username: true, email: true, fullName: true });
}

PostSchema.pre('find', autoPopulate);
PostSchema.pre('findOne', autoPopulate);

PostSchema.post('save', function (doc, next) {
  doc
    .populate('author', { username: true, email: true, fullName: true })
    .execPopulate()
    .then(function () {
      next();
    });
});

PostSchema.loadClass(Post);

export default mongoose.model('Posts', PostSchema);
