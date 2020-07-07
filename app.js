const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const accountRouter = require('./router/account');
const workRouter = require('./router/work');

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, console.log('Express server is opened on port 3000.'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

app.use('/account', accountRouter);
app.use('/', workRouter);
