import Hashtags from '../models/HashTag';

export const autocomplete = async (req, res) => {
  const limit = 15;
  const pattern = new RegExp(`^${req.params.hashtag}`, 'ig');
  const hashtags = await Hashtags.find({ hashtag: pattern }, null, { limit });
  res.json(hashtags);
};
