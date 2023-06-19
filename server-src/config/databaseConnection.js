import mongoose from "mongoose";

const database = mongoose.connect('mongodb://127.0.0.1:27017/taskuserDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

export default database;