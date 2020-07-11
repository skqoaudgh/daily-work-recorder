const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const session = require('express-session');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const path = require('path');

const compression = require('compression');
const dotenv = require('dotenv').config();

const { getFormattedDate } = require('./util');
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

app.use(compression());
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public/assets/favicon.ico')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
  })
);
app.use(flash());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PW,
  },
});

app.get('/', async (req, res, next) => {
  try {
    const list = await Work.find().sort('startTime');
    res.render('index.ejs', {
      workList: list,
      message: req.flash('message'),
    });
  } catch (err) {
    console.error(err);
    res.render('index.ejs', { workList: [], message: req.flash('message') });
  }
});

app.post('/work', async (req, res, next) => {
  try {
    const { work } = req.body;
    if (work.length > 0) {
      const date = new Date();
      date.setHours(date.getHours() + Number(process.env.HOUR));
      const startTime = date.toLocaleString('ko-KR');

      const newWork = new Work({ work, startTime });
      await newWork.save();
    } else {
      req.flash('message', '아무것도 입력하지 않았습니다.');
    }
    res.redirect('/');
  } catch (err) {
    console.error(err);
  }
});

app.get('/work/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const date = new Date();
    date.setHours(date.getHours() + Number(process.env.HOUR));
    const endTime = date.toLocaleString('ko-KR');
    const work = await Work.findById(id);

    work.endTime = endTime;
    await work.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
  }
});

app.get('/reset', async (req, res, next) => {
  try {
    await Work.deleteMany();

    res.redirect('/');
  } catch (err) {
    console.error(err);
  }
});

app.post('/mail', (req, res, nect) => {
  const { url } = req.body;
  const timeString = getFormattedDate(new Date());
  const mailOption = {
    from: process.env.GMAIL_ID,
    to: process.env.GMAIL_ID,
    subject: `[DailyWorkRecorder] 오늘의 업무 내용이 도착했습니다. - ${timeString}`,
    text: 'Daily Work Recorder로부터 오늘의 업무 내용이 도착했습니다.',
    attachments: [
      {
        path: url,
      },
    ],
  };

  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      req.flash('message', '이메일을 전송했습니다.');
      res.redirect('/');
    }
  });
});
