const dotenv = require('dotenv').config();// access variables we want to keep secret in a .env file
const axios = require('axios'); // library to make http requests
const path = require('path'); // to access files by pathname
const fs = require('fs') // allow access to the file system

/* 
To successfuly test this in a local environment, you'll need to create a secure server that uses HTTPS.
To set up an HTTPS server, follow the instructions in the linked article
https://medium.com/@nitinpatel_20236/how-to-create-an-https-server-on-localhost-using-express-366435d61f28
*/

const express = require('express'); // to create our server
const key = fs.readFileSync('./certs/key.pem'); // Get Key
const cert = fs.readFileSync('./certs/cert.pem'); // Get Certificate
const https = require('https');
const { builtinModules } = require('module');

const app = express(); // create the express app
const server = https.createServer({ key: key, cert: cert }, app); // create secure server

app.use(express.static('static')); // use the index.html site in the static folder

// If we recieve a get request to the root (localhost:5500) then the server will route to the static index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

// If we recieve a get request to /auth then the server will route webflow's auth page for our app
app.get('/auth', (req, res) => {
  res.redirect(
    `https://webflow.com/oauth/authorize?response_type=code&client_id=${process.env.WEBFLOW_CLIENT_ID}`,
  );
});

// If we recieve a get request to /oauth-callback then the server will make a POST request to webflow for an Authorization Code

app.get('/oauth-callback', ({ query: { code } }, res) => {

  // Body of POST Request
  const body = {
    client_id: process.env.WEBFLOW_CLIENT_ID,
    client_secret: process.env.WEBFLOW_CLIENT_SECRET,
    code: authorizationCode,
    grant_type: 'authorization_code'
  };

  // Define request options
  const opts = { headers: { accept: 'application/json' } };

  // Make Call
  axios
    .post('https://api.webflow.com/oauth/access_token', body, opts)
    .then((_res) => _res.data.access_token)
    .then(token => 
        
      { res.redirect(`/?token=${token}`); 
    })
    .catch(err => {
      res.status(500).json({ err: err.message });
    });
});


server.listen(5500);
// eslint-disable-next-line no-console
console.log('App listening on port 5500');

/*
Wait, what state param?
After you've gotten the access token - you now need to ID whether or not the Webflow user has an account with your service
*/