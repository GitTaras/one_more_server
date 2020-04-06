import Hashtags from '../models/HashTag';

export const autocomplete = async (req, res) => {
  const { limit = 15 } = req.query.limit;
  const regexp = new RegExp(`^${req.query.hashtag}`, 'ig');
  const hashtags = await Hashtags.find({ hashtag: regexp }, null, { limit });
  res.json(hashtags);
};
