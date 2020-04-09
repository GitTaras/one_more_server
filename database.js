import mongoose from 'mongoose';

const connectionString = process.env.DB_PATH;
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(connectionString, connectionOptions);

const { connection } = mongoose;
connection.on('error', () => {
  console.log("can't connect to db, fuck out from here");
  process.exit();
});
connection.on('connected', () => console.log('DB connected success'));
connection.once('disconnected', () => console.log('DB connection failed'));
mongoose.set('debug', true);

export { connection };
