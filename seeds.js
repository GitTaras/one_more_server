import './dotenv/config';
import faker from 'faker';
import bcrypt from 'bcrypt';
import db from './config/mongoose';
import Users from './models/User';
import Posts from './models/Post';
import HashTags from './models/HashTag';

const init = async () => {
  try {
    console.log('Creating fake data...');
    const testdriveUserData = {
      username: 'testdrive',
      email: 'test.drive@test.drive',
      password: '123456',
    };
    testdriveUserData.password = await bcrypt.hash(
      testdriveUserData.password,
      await bcrypt.genSalt(8)
    );

    const johndouUserData = {
      username: 'john_dou',
      email: 'john.dou@gmail.com',
      password: '123456',
    };
    johndouUserData.password = await bcrypt.hash(johndouUserData.password, await bcrypt.genSalt(8));

    const testdriveUser = await Users(testdriveUserData);
    const johndouUser = await Users(johndouUserData);
    const items = [];
    for (let i = 0; i < 123; i++) {
      const tag = i%2 ? "one" : "two";
      const testdrivePost = new Posts({
        message: `${i} #${tag} ${faker.lorem.sentences()} ${i}`,
        author: testdriveUser.id,
        hashtags: [tag],
      });
      const johnPost = new Posts({
        message: `${i} #${tag} ${faker.lorem.sentences()} ${i}`,
        author: johndouUser.id,
        hashtags: [tag],
      });
      items.push(testdrivePost, johnPost);
      testdriveUser.posts.push(testdrivePost.id);
      johndouUser.posts.push(johnPost.id);
    }
    await Posts.insertMany(items);
    await HashTags.create({ hashtag: 'one' });
    await HashTags.create({ hashtag: 'two' });
    await testdriveUser.save();
    await johndouUser.save();
    console.log('wrote random data to db...');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

init();
