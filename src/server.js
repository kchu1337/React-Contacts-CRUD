'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers/controller');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.get('/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/', controller.createContact);
app.get('/api/', controller.getAllContacts);
app.put('/api/', controller.updateContact);
app.delete('/api/', controller.deleteContact);

app.listen(port, () => console.log(`Listening on port ${port}`));