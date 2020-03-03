import mongoose from "mongoose";
import Messages from "../models/Messages.model";
const path = 'mongodb://localhost/twitter';

mongoose.connect(path, {
  useNewUrlParser: true,
}, (err) => {
  if (err) {
    console.log('can\'t connect to db, fuckout from here');
    process.exit(1);
  } else {
    console.log('DB connection success');
    init();
  }
});
mongoose.set('debug', true);

const init = async () => {
  if (await Messages.estimatedDocumentCount()) {
    console.log("have some data");
  } else {
    console.log('Creating fake data...');
    const items = [];
    for(let i = 0; i < 123; i++) {
      items.push( new Messages({
        message: `${i}`
      }) );
    }
    let result = await Messages.insertMany(items);
    console.log('wrote random data to db...');
  }
};

export default mongoose;