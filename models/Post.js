import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import HashTags from './HashTag';

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

class Post {
  static async saveHashTags(hashtags) {
    const existingHashtagsObj = await HashTags.find({ hashtag: { $in: hashtags } });
    const existingHashtags = existingHashtagsObj.map(({ hashtag }) => hashtag);
    const unexistingHashtags = hashtags.filter(
      (hashtag) => existingHashtags.includes(hashtag) === false
    );
    await unexistingHashtags.map(async (hashtag) => await HashTags.create({ hashtag }));
  }
}

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
