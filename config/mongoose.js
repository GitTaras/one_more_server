import mongoose from "mongoose";
const path = 'mongodb://localhost/twitter';

mongoose.connect(path, {
  useNewUrlParser: true,
});
mongoose.set('debug', true);

export default mongoose;