const express = require('express');
const compression = require('compression');
const cors = require('cors');

const app = express();
const port = 80;

app.use(cors());
app.use(compression());
app.use(express.static('dist'));

app.get('*', function (request, response, next) {
  response.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
