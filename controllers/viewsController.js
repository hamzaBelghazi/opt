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
const APIFeatures = require('../utils/apiFeatures');

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
  const { q } = req.query;
  req.query.limit = 9;
  req.query.page = req.query.page || 1;
  const features = new APIFeatures(
    Product.find({ $text: { $search: q } }),
    req.query
  );
  const resultsCount = await Product.find(req.query).countDocuments();
  features.filter().sort().limitFields().paginate();

  const products = await features.query;
  res.status(200).render('products', {
    title: 'search',
    products,
    resultsCount,
  });
});

exports.getOverview = catchAsync(async (req, res, next) => {
  const products = await Product.find().populate('favourit').limit(8);

  const banners = await Banner.find();
  const categories = await Category.find();
  const announces = await Announce.find();

  res.status(200).render('overview', {
    title: 'Home',
    products,
    banners,
    categories,
    announces,
  });
});
exports.getPage = catchAsync(async (req, res, next) => {
  const page = await Page.findById(req.params.id);

  res.status(200).render('page', {
    title: 'page.name',
    page,
  });
});
exports.getFrames = catchAsync(async (req, res, next) => {
  req.query.limit = 9;
  req.query.page = req.query.page || 1;
  req.query.glassesType = 'prescription';
  const features = new APIFeatures(Product.find(), req.query);
  const resultsCount = await Product.find(req.query).countDocuments();
  features.filter().sort().limitFields().paginate();

  const products = await features.query;

  if (!products) {
    return next(new AppError('There is no glasses with that name.', 404));
  }
  res.status(200).render('products', {
    title: 'all frames',
    products,
    resultsCount,
  });
});
exports.getSunGlasees = catchAsync(async (req, res, next) => {
  req.query.limit = 9;
  req.query.glassesType = 'sunglasses';
  const features = new APIFeatures(Product.find(), req.query);
  const resultsCount = await Product.find(req.query).countDocuments();
  features.filter().sort().limitFields().paginate();

  const products = await features.query;
  if (!products) {
    return next(new AppError('There is no glasses with that name.', 404));
  }
  res.status(200).render('products', {
    title: 'sunglasses..',
    products,
    resultsCount,
  });
});
exports.getBycollection = catchAsync(async (req, res, next) => {
  const { col } = req.params;
  const products = await Product.find({ collections: col }).limit(9);
  if (!products) {
    return next(new AppError('There is no glasses with that name.', 404));
  }
  res.status(200).render('products', {
    title: 'categorie...',
    products,
  });
});

exports.getBycategory = catchAsync(async (req, res, next) => {
  req.query.limit = 9;
  const { cat } = req.params;

  const features = new APIFeatures(
    Product.find({ categories: cat }),
    req.query
  );
  const resultsCount = await Product.find(req.query).countDocuments();
  features.filter().sort().limitFields().paginate();
  const products = await features.query;

  if (!products) {
    return next(new AppError('There is no glasses with that name.', 404));
  }
  res.status(200).render('products', {
    title: 'sunglasses',
    products,
    resultsCount,
  });
});

exports.getProducts = catchAsync(async (req, res, next) => {
  const queryObj = req.query;
  const products = await Product.find(queryObj).limit(9);
  if (!products) {
    return next(new AppError('There is no glasses with that name.', 404));
  }
  res.status(200).render('products', {
    title: 'all goods',
    products,
  });
});
exports.getSingleProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  // const rProducts = await Product.find({ glassesType: product.glassesType });
  if (!product) {
    return next(new AppError('There is no frames with that name.', 404));
  }
  res.status(200).render('product', {
    title: product.title,
    product,
    // rProducts,
  });
});

exports.getLense = catchAsync(async (req, res, next) => {
  const lens = await Lens.find();
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return next(new AppError('this page not found!', 404));
  }
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
  const obj = orders.map((order) => {
    return {
      isComplet: order.isComplet,
      id: order.id,
      orderNum: order.orderNum,
      totalPrice: order.products[0]?.price,
      quantity: order.products[0]?.quantity,
      item: order.products[0]?.item,
    };
  });
  const favorite = await Favourit.find({ user: res.locals.user }).populate(
    'product'
  );

  res.status(200).render('account', {
    title: 'Your account',
    orders: obj,
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

exports.forggetPass = async (req, res, next) => {
  if (res.locals.user) {
    return res.redirect('/');
  }
  res.render('forggotPassword', {
    title: 'Recover Password',
  });
};

// admin section

exports.getAdminPanel = catchAsync(async (req, res, next) => {
  const productsCount = await Product.find().countDocuments();
  const usersCount = await User.find().countDocuments();
  const ordersCount = await Order.find().countDocuments();

  res.render('admin/dashboard', {
    layout: 'admin/dashboard',
    productsCount,
    usersCount,
    ordersCount,
  });
});
exports.userSetPanel = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.render('admin/users-setting', {
    layout: 'admin/users-setting',
    users,
  });
});

exports.announceSetPanel = catchAsync(async (req, res, next) => {
  const announces = await Announce.find();
  res.render('admin/announcments-setting', {
    layout: 'admin/announcments-setting',
    announces,
  });
});

exports.bannerSetPanel = catchAsync(async (req, res, next) => {
  const banners = await Banner.find();
  res.render('admin/banners-setting', {
    layout: 'admin/banners-setting',
    banners,
  });
});
exports.catSetPanel = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.render('admin/categories-setting', {
    layout: 'admin/categories-setting',
    categories,
  });
});
exports.colSetPanel = catchAsync(async (req, res, next) => {
  const collections = await Collection.find();

  res.render('admin/collections-setting', {
    layout: 'admin/collections-setting',
    collections,
  });
});
exports.lensSetPanel = catchAsync(async (req, res, next) => {
  const lenses = await Lens.find();

  res.render('admin/lenses-setting', {
    layout: 'admin/lenses-setting',
    lense: lenses[0],
  });
});
exports.orderSetPanel = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  const obj = orders.map((order) => {
    return {
      isComplet: order.isComplet,
      id: order.id,
      orderNum: order.orderNum,
      totalPrice: order.products[0]?.price,
      quantity: order.products[0]?.quantity,
      item: order.products[0]?.item,
    };
  });

  res.render('admin/orders-setting', {
    layout: 'admin/orders-setting',
    orders: obj,
  });
});
exports.pageSetPanel = catchAsync(async (req, res, next) => {
  const pages = await Page.find();

  res.render('admin/pages-setting', {
    layout: 'admin/pages-setting',
    pages,
  });
});
exports.prodSetPanel = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  const products = await Product.find();
  res.render('admin/products-setting', {
    layout: 'admin/products-setting',
    products,
    categories,
  });
});

// admin section end

exports.success = async (req, res, next) => {
  res.status(200).render('success', {
    title: 'all is well 😆',
  });
};

exports.contact = async (req, res, next) => {
  res.status(200).render('contact', {
    title: ' Customer service',
  });
};

exports.returns = async (req, res, next) => {
  res.status(200).render('returns', {
    title: 'Returns',
  });
};

exports.garantee = async (req, res, next) => {
  res.status(200).render('garantee', {
    title: 'Guarantee',
  });
};

exports.shipping = async (req, res, next) => {
  res.status(200).render('shipping', {
    title: 'Shipping and delivery',
  });
};

exports.aboutUs = async (req, res, next) => {
  res.status(200).render('ourstory', {
    title: 'Our Story',
  });
};
