require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

let app = express();
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.use(
  session(
    {
      secret: process.env.SESSION_SECRET || 'fallback-secret-key',
      resave: false,
      saveUninitialized: false,
    }
  )
)

app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  if (req.path === '/' || req.path === '/login' || req.path === '/logout') {
    return next();
  }

  if (req.session.isLoggedIn) {
    next();
  } else {
    res.render('login', {error_message: 'Please log in to access this page.'});
  }
});

app.get('/', (req, res) => {
  if (req.session.isLoggedIn) {
    res.render('index');
  } else {
    res.render('login', {error_message: ''});
  }
});

app.post('/login', (req, res) => {
  const sName = req.body.username;
  const sPassword = req.body.password;

  if ((sName == 'jesus') && (sPassword == 'creator')) {
    req.session.isLoggedIn = true;
    req.session.username = sName;
    res.redirect('/');
  } else {
    res.render('login', {error_message: 'Invalid login.'});
  }
});

app.get('logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

app.use((req, res) => {
  res.render('index');
})

app.listen(port, () => {
  console.log(`Waking up...`);
  console.log(`The server is awake...`)
  console.log(`Visit app on http://localhost:${port}`);
});