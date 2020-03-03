import fs from 'fs';
import express from 'express';
import cors from 'cors';
import util from 'util';
import _ from 'lodash';
const PORT = process.env.PORT || 5000;
const app = express();
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
import mongoose from './config/mongoose';
import Messages from './models/Messages.model';

app.use(cors());
app.use(express.json());

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

init();

app.get('/api/chat', async (req, res) => {
  let offset = parseInt(_.get(req, 'query.offset', 0), 10);
  let limit = parseInt(_.get(req, 'query.limit', 15), 10);

  try {
    const length = await Messages.estimatedDocumentCount();
    const hasMore = length > offset + limit;

    const messages  = hasMore ?  await Messages.find({}, null, {skip: length - offset - limit, limit}) : await Messages.find({}, null, {limit: length - offset});
    res.send({messages, hasMore});

  } catch(e) {
    console.error(e);
    res.sendStatus(404);
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const message = req.body.message.trim();
    if(!message) {
      throw new Error();
    }

    const newMessage = new Messages({ message });
    await newMessage.save();
    res.send(newMessage).status(200);

  } catch(e) {
    console.error(e);
    res.sendStatus(400);
  }

});

app.delete('/api/chat/:id', async (req, res)=>{
  const id = req.params.id.trim();

  try {
    if (!id) {
      throw new Error();
    }

    let result = await Messages.findByIdAndDelete(new mongoose.Types.ObjectId(id));

    if (!result._id) {
      throw new Error();
    }

    res.sendStatus(200);


  } catch(e) {
    console.error(e);
    res.sendStatus(400);
  }

});

app.listen(PORT, () => console.log(`listen on ${PORT}`));