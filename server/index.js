require('dotenv/config')
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const {PORT} = process.env
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', function (req, res) {
	res.json({"APP": "if you see me you hit the api!"});
});
app.listen(PORT, function () {console.log(`Node server listening http://localhost:${PORT}`);});