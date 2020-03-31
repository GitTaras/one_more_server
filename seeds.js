import faker from 'faker';
import bcrypt from 'bcrypt';
import db from './config/mongoose';
import Users from './models/User';
import Messages from './models/Message';

const init = async () => {
  try {
    console.log('Creating fake data...');
    const testdriveUserData = {
      fullName: 'testdrive testdrive',
      username: 'testdrive',
      email: 'test.drive@test.drive',
      password: '123456',
    };
    testdriveUserData.password = await bcrypt.hash(
      testdriveUserData.password,
      await bcrypt.genSalt(8)
    );

    const johndouUserData = {
      fullName: 'john dou',
      username: 'john_dou',
      email: 'john.dou@gmail.com',
      password: '123456',
    };
    johndouUserData.password = await bcrypt.hash(
      johndouUserData.password,
      await bcrypt.genSalt(8)
    );

    const testdriveUser = await Users.create(testdriveUserData);
    const johndouUser = await Users.create(johndouUserData);
    const items = [];
    for (let i = 0; i < 123; i++) {
      items.push(
        new Messages({ message: `${i} ${faker.lorem.sentences()} ${i}`, author: testdriveUser.id }),
        new Messages({ message: `${i} ${faker.lorem.sentences()} ${i}`, author: johndouUser.id })
      );
    }
    let result = await Messages.insertMany(items);
    console.log('wrote random data to db...');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

init();
