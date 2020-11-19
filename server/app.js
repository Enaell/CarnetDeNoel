var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');


//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

var app = express();

app.use(cors());
app.use(require('morgan')('dev'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'languagelearningapp', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

mongoose
  .connect(
    'mongodb://mongo:27017/expressmongo',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

require('./models/users');
require('./models/gifts');
require('./config/passport');

 var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// const wordRouter = require('./routes/words');
//app.use(require('./routes'));

 app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;