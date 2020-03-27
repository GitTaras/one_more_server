import db from './config/mongoose';
import Users from './models/User';
import Messages from './models/Message';
import faker from 'faker';

const init = async () => {
  try {
    console.log('Creating fake data...');
    const testdriveUserData = {
      firstName: 'testdrive',
      lastName: 'testdrive',
      email: 'test.drive@test.drive',
      password: '123456',
    };
    const testdriveUser = await Users.create(testdriveUserData);
    const items = [];
    for (let i = 0; i < 123; i++) {
      items.push(
        new Messages({ message: `${i} ${faker.lorem.sentences()} ${i}`, author: testdriveUser.id })
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
