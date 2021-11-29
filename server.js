const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

//for loading variables of .env file as environment variable
dotenv.config({ path: './config.env' });


const app = require('./app');

//String of mongoDB atlas cluster 
const DB = `mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@cluster0.mzy3t.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`

//database connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'));

const port =  3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

