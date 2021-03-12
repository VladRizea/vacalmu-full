const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// *Load env vars

dotenv.config({ path: './config/config.env' });

// *List models

const Article = require('./models/Article');
const UserGenerator = require('./models/UserGenerator');
const User = require('./models/User');

// *Connect to db

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// *Read JSON files

// *Import in to db

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);
    await Review.create(reviews);

    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// *Delete data

const deleteData = async () => {
  try {
    await Article.deleteMany();
    await UserGenerator.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
