const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cors = require("cors");

//* Import routes
const articles = require('./routes/articles');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');
const categories = require('./routes/categories');
const feed = require('./routes/feed');



//* Load the database
connectDB();

//* Load enviroment variables
dotenv.config({ path: './config/config.env' });

//* Enable express
const app = express();

//* Body parser
app.use(express.json());

//* Cookie parser
app.use(cookieParser());



app.use(cors({
  // origin: 'http://localhost:3000',
  origin: 'vacalm-client:80',
  credentials: true
}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/articles', articles);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
app.use('/api/v1/categories', categories);
app.use('/api/v1/feed', feed);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejection

process.on('unhandledRejection', (err, promise) => {
  console.log(`ERROR: ${err.message}`.red.bold);
  //Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
