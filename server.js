require('dotenv').config({ path: './config.env' });
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const xssAdvanced = require('xss-advanced');

const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pug = require('pug');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const lensRouter = require('./routes/lensRouter');
const viewRouter = require('./routes/viewRouter');
const bannerRouter = require('./routes/bannerRouter');
const categoryRouter = require('./routes/categoryRouter');
const collectionRouter = require('./routes/collectionRouter');
const virtualTryRouter = require('./routes/virtualTryRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const announceRouter = require('./routes/annouceRouter');
const pageRouter = require('./routes/pageRouter');
const favouritRouter = require('./routes/favouritRouter');

const { I18n } = require('i18n');

const app = express();

const i18n = new I18n();

// const DB = process.env.DATA_BASE_LOCAL;

const DB = process.env.DATA_BASE_STR.replace(
  '<PASSWORD>',
  process.env.DATA_BASE_PASS
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

i18n.configure({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  // queryParameter: 'lang',
  directory: __dirname + '/locales',
  cookie: 'locale',
});

app.use(
  session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({ mongoUrl: DB }),
    cookie: { maxAge: 30 * 60 * 60 * 1000 },
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Set security HTTP headers
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(i18n.init);
app.use(function (req, res, next) {
  res.locals.__ = res.__ = function () {
    return i18n.__.apply(req, arguments);
  };
  next();
});
app.get('/setlocale/:locale', function (req, res) {
  res.cookie('locale', req.params.locale);
  res.redirect('back');
});
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());
app.use(xssAdvanced());

// Prevent parameter pollution
app.use(hpp());

// 3) ROUTES
app.use('/', viewRouter);

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/lenses', lensRouter);
app.use('/api/banners', bannerRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/collections', collectionRouter);
app.use('/api/virtuals', virtualTryRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/announces', announceRouter);
app.use('/api/pages', pageRouter);
app.use('/api/favourite', favouritRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
