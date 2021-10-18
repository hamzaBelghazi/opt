const Product = require('../models/productModel');
const User = require('../models/userModel');
const Banner = require('../models/bannerModel');
const Category = require('../models/categoryModel');
const Collection = require('../models/collectionModel');
const Cart = require('../models/cartModel');
const Lens = require('../models/lensModel');
const Order = require('../models/orderModel');
const Announce = require('../models/announceModel');
const Page = require('../models/pageModel');
const Favourit = require('../models/favouritModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.cart = (req, res, next) => {
  let cart = new Cart(req.session.cart || {});
  res.locals.totalPrice = cart.totalPrice;
  res.locals.list = cart.list();
  next();
};
exports.pages = async (req, res, next) => {
  res.locals.pages = await Page.find();
  next();
};

exports.getSearch = catchAsync(async (req, res, next) => {
  const searchQuery = req.body;
  const products = await Product.find().limit(9);
  res.status(200).render('overview', {
    title: 'search',
    products,
  });
});

exports.getOverview = catchAsync(async (req, res, next) => {
  const products = await Product.find().limit(9);
  const banners = await Banner.find();
  const categories = await Category.find();
  const collections = await Collection.find();
  const announces = await Announce.find();

  res.status(200).render('overview', {
    title: 'Home',
    products,
    banners,
    categories,
    collections,
    announces,
  });
});
exports.getPage = catchAsync(async (req, res, next) => {
  const page = await Page.findById(req.params.id);

  res.status(200).render('page', {
    title: page.name,
    page,
  });
});
exports.getFrames = catchAsync(async (req, res, next) => {
  const products = await Product.find({ glassesType: 'prescription' }).limit(9);
  if (!products) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  res.status(200).render('products', {
    title: 'all frames',
    products,
  });
});
exports.getSunGlasees = catchAsync(async (req, res, next) => {
  const products = await Product.find({ glassesType: 'sunglasses' }).limit(9);
  if (!products) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  res.status(200).render('products', {
    title: 'sunglasses',
    products,
  });
});
exports.getProducts = catchAsync(async (req, res, next) => {
  const queryObj = req.query;
  const products = await Product.find(queryObj).limit(9);
  if (!products) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  res.status(200).render('products', {
    title: 'all goods',
    products,
  });
});
exports.getSingleProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  const rProducts = await Product.find({ glassesType: product.glassesType });

  if (!product) {
    return next(new AppError('There is no frames with that name.', 404));
  }
  res.status(200).render('product', {
    title: product.title,
    product,
    rProducts,
  });
});

exports.getLense = catchAsync(async (req, res, next) => {
  const lens = await Lens.find();
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return next(new AppError('this page not found!', 404));
  }
  console.log(lens);
  res.status(200).render('lense', {
    title: `lenses for ${product.title}`,
    lens,
    product,
  });
});

exports.getCart = (req, res) => {
  let list = res.locals.list;
  let totalPrice = res.locals.totalPrice;
  res.status(200).render('cart', {
    title: 'Your Cart',
    list,
    totalPrice,
  });
};

exports.getLoginForm = (req, res) => {
  if (res.locals.user) {
    return res.redirect('/');
  }

  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getRegisterForm = (req, res) => {
  if (res.locals.user) {
    return res.redirect('/');
  }
  res.status(200).render('register', {
    title: 'register an account',
  });
};

exports.getAccount = catchAsync(async (req, res) => {
  if (!res.locals.user) {
    return res.redirect('/');
  }
  const orders = await Order.find({ user: res.locals.user });
  const favorite = await Favourit.find({ user: res.locals.user }).populate(
    'product'
  );

  console.log(favorite);
  res.status(200).render('account', {
    title: 'Your account',
    orders,
    favorite,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

exports.passChange = (req, res, next) => {
  res.render('password', {
    title: 'set password',
  });
};

exports.getAdminPanel = catchAsync(async (req, res, next) => {
  const banners = await Banner.find();
  const products = await Product.find();
  const orders = await Order.find();
  const collections = await Collection.find();
  const categories = await Category.find();
  const announces = await Announce.find();
  const pages = await Page.find();
  const lenses = await Lens.find();

  res.render('admin', {
    title: 'Admin Dashboard',
    banners,
    products,
    orders,
    collections,
    categories,
    announces,
    pages,
    lenses,
  });
});
