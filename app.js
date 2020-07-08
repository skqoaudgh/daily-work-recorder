const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Work = require('./model/Work');

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res, next) => {
  const list = await Work.find().sort('startTime');
  res.render('index.ejs', { workList: list });
});

app.post('/work', async (req, res, next) => {
  const { work } = req.body;
  const startTime = new Date().toLocaleString('ko-KR');

  const newWork = new Work({ work, startTime });
  await newWork.save();
  res.redirect('/');
});

app.get('/work/:id', async (req, res, next) => {
  const id = req.params.id;
  const endTime = new Date().toLocaleString('ko-KR');
  const work = await Work.findById(id);

  work.endTime = endTime;
  await work.save();
  res.redirect('/');
});

app.get('/reset', async (req, res, next) => {
  await Work.deleteMany();

  res.redirect('/');
});
