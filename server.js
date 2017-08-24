const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('BYOB');
});

app.listen(app.get('port'), () => {
  console.log(`BYOB is running on ${app.get('port')}.`);
});

module.exports = app;
