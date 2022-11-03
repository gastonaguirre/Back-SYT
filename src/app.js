const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require("cors");
// const { auth } = require('express-openid-connect');
// const { requiresAuth } = require('express-openid-connect');

require('./db.js');
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3001',
//   clientID: 'dbEo6p0zxZG7X0glf6JVdrg6lCRpLtYe',
//   issuerBaseURL: 'https://dev-3os76g7vk3pv8aji.us.auth0.com'
// };

const server = express();
// auth router attaches /login, /logout, and /callback routes to the baseURL
// server.use(auth(config));

// req.isAuthenticated is provided from the auth router

// server.get('/profile', requiresAuth(), (req, res) => {
//   const cositas = console.log(req.oidc.user)
//   cositas
//   res.send(JSON.stringify(req.oidc.user));
// });
server.name = 'API';
server.use(express.json())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// server.get('/', (req, res) => {
//   res.send(`<a href="/admin">Admin Section</a>`);
// });
// server.get('/admin',requiresAuth(), (req, res) =>
//   res.send(`Hello $, this is the admin section.`)
// );
// server.get("/logout",(req,res)=>{

// })

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = server;