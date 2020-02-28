import fs from 'fs';
import express from 'express';
import cors from 'cors';
import faker from 'faker';
import util from 'util';
import _ from 'lodash';
const PORT = process.env.PORT || 5000;
const app = express();
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

app.use(cors());
app.use(express.json());

const init = () => {
  if (fs.existsSync('./chat.json')) {
    console.log('The path exists.');
  } else {
    console.log('Creating file...');

    const items = [];

    for(let i = 0; i < 123; i++) {
      items.push({
        "id": faker.random.uuid(),
        "message": faker.lorem.sentences(), 
      });
    }
    const data = JSON.stringify(items);
    fs.writeFileSync('chat.json', data);
    console.log('wrote random data to chat.json...');
  }
};

init();

app.get('/api/chat', async (req, res) => {
  //res.sendStatus(404);
  let offset = parseInt(_.get(req, 'query.offset', 0), 10);
  let limit = parseInt(_.get(req, 'query.limit', 15), 10);

  try {

    const data = await readFilePromise('./chat.json', 'utf-8');
    let messages = JSON.parse(data);
    let hasMore = messages.length > offset + limit;

    messages = hasMore ? messages.slice(messages.length - offset - limit, messages.length - offset) : messages.slice(0, messages.length - offset);
    res.send({messages, hasMore});

  } catch(e) {
    console.error(e);
    res.sendStatus(404);
  }
});

app.post('/api/chat', async (req, res) => {
    // res.sendStatus(400);
  try {
    const data = await readFilePromise('./chat.json', 'utf-8');
    const messages = JSON.parse(data);

    messages.push(req.body);
    await writeFilePromise('./chat.json', JSON.stringify(messages));

    res.sendStatus(200);
    console.log(`write message: ${req.body.id} succesfully!`);
  } catch(e) {
    console.error(e);
    res.sendStatus(400);
  }

});

app.delete('/api/chat/:id', async (req, res)=>{
  const id = req.params.id.trim();

  if (!id) {
    return res.sendStatus(404);
  }

  try {
    const data = await readFilePromise('./chat.json', 'utf-8');
    const messages = JSON.parse(data);
    const index = messages.findIndex((message) => message.id === id);

    if (index === -1) {
      console.log("not found");
      throw new Error();
    }
    messages.splice(index, 1);
    await writeFilePromise('./chat.json', JSON.stringify( messages));
    res.sendStatus(200);
    console.log(`delete message: ${id} succesfully!`);
  } catch(e) {
    console.error(e);
    res.sendStatus(400);
  }

});

app.listen(PORT, () => console.log(`listen on ${PORT}`));