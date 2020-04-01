import mongoose from 'mongoose';

const path = process.env.DB_PATH || 'mongodb://localhost/twitter';

let db = null;

export default (async () => {
  try {
    if (!db) {
      db = await mongoose.connect(path, { useNewUrlParser: true });
      console.log('DB connection success');
      db.set('debug', true);
      return db;
    }
    return db;
  } catch (e) {
    console.log("can't connect to db, fuck out from here", e);
    process.exit(1);
  }
})();
