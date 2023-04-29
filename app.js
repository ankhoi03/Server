var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session=require('express-session');
const mongoose=require('mongoose');

require('./components/category/CategoryModel');
require('./components/products/ProductModel');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lab2Router = require('./routes/lab2');

const productAPIRouter= require('./routes/api/ProductAPI');
const userAPIRouter= require('./routes/api/UserAPI');
const productCpanelRouter= require('./routes/cpanel/ProductCPanel');
const userCpanelRouter= require('./routes/cpanel/UserCPanel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'iloveyou',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
mongoose.connect('mongodb+srv://khoikz:anhnhoem03@cluster0.gm6uuv7.mongodb.net/MOB402?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lab2', lab2Router);

app.use('/api/user',userAPIRouter);
app.use('/api/product',productAPIRouter);
app.use('/cpanel/user',userCpanelRouter);
app.use('/cpanel/product',productCpanelRouter);

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
