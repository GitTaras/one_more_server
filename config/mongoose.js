import mongoose from "mongoose";
const path = 'mongodb://localhost/twitter';

mongoose.connect(path, {
  useNewUrlParser: true,
}, (err) => {
  if (err) {
    console.log('can\'t connect to db, fuckout from here');
    process.exit(1);
  } else {
    console.log('DB connection success');
  }
});
mongoose.set('debug', true);

export default mongoose;