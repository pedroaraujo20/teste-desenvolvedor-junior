const express = require('express');
var data = require('./characters.json');

const app = express();

app.get('/characters', (req, res) => {
  res.json(data);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);