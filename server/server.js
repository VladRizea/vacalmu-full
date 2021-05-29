const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const aws = require('aws-sdk');
//* Import routes
const articles = require('./routes/articles');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');
const categories = require('./routes/categories');
const feed = require('./routes/feed');
const upload = require('./routes/upload');
const email = require('./routes/email');


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
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use((req, res, next) => {
  const allowedOrigins = ['https://vacalmu.live:80', 'https://vacalmu.live:443'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

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
app.use('/api/v1/upload', upload);
app.use('/api/v1/email', email);

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
