const express = require('express');
const app = express();
const controller = require('./controllers/controler');

const port = 3000;

controller(app);

app.listen(port, () => {
  console.log(`running at port ${port}`);
});