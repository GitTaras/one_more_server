import Hashtags from '../models/HashTag';

//todo it's not the end...

export const autocomplete = async (req, res) => {
  const { limit = 15 } = req.query.limit;
  const regexp = new RegExp(`^${req.query.hash_tag}`, 'ig');
  const hashtags = await Hashtags.find({ hashtag: regexp }, null, { limit });
  res.json(hashtags);
};
