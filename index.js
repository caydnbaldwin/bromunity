// import environment variables
require('dotenv').config();

// import express libraries
const express = require('express');
const session = require('express-session');

// middleware
const middleware = require('./utilities/middleware');

// routes
const authenticationRouter = require('./api/authentication/AuthenticationRouter');
const personsRouter = require('./api/persons/PersonsRouter');
const profilesRouter = require('./api/profiles/ProfilesRouter');
const friendshipsRouter = require('./api/friendships/FriendshipsRouter');

// app
let app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session(
    {
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }
  )
);

// routing
app.use(middleware.authenticate);
app.use('/authentication', authenticationRouter);
app.use('/persons', personsRouter);
app.use('/profiles', profilesRouter);
app.use('/friendships', friendshipsRouter);
app.get('/', (req, res) => {
  res.render('bromunity-page');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Visit app on http://localhost:${port}`);
});