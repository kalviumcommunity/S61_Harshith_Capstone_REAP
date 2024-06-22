const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();
const port = 3000;

const userRoutes = require('./routes/userRoutes');
const passportConfig = require('./routes/passportConfig');
const routes = require('./routes')




app.use(express.json());
app.use(cors());
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passportConfig);
app.use(cookieParser())

app.use('/user', userRoutes);
app.use('/notes', routes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});