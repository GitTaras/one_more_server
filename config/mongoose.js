import mongoose from "mongoose";
import Messages from "../models/messages-schemal";
const path = 'mongodb://localhost/twitter';

const writeFakeData = async () => {
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

export default async () => {
  try {
    await mongoose.connect(path, {useNewUrlParser: true,});
    console.log('DB connection success');
    mongoose.set('debug', true);
    writeFakeData();
  } catch (e) {
    console.log('can\'t connect to db, fuck out from here');
    process.exit(1);
  }
}