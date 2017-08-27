require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router');

const environment = process.env.NODE_ENV || 'development';
const app = express();

app.use(express.static(path.join(__dirname, '../Client')));

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'Client/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`BYOB is running on ${app.get('port')}.`);
});

module.exports = app;
