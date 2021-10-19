const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Lens = require('../models/lensModel');

exports.deletItem = catchAsync(async (req, res, next) => {
  const itemid = req.params.itemId;
  const cart = new Cart(req.session.cart);
  cart.delete(itemid);
  res.locals.session.cart = cart;

  res.status(200).json({ status: 'success' });
});

exports.changeQuantity = catchAsync(async (req, res, next) => {
  const itemid = req.params.itemId;
  const quntity = req.params.quntity;
  const cart = new Cart(req.session.cart);
  cart.incDecQuantity(itemid, quntity);
  res.locals.session.cart = cart;

  res.status(200).json({ status: 'success' });
});

exports.addglassesWithlenses = catchAsync(async (req, res, next) => {
  const cart = new Cart(req.session.cart || {});
  const lens = await Lens.find();
  const product = await Product.findById(req.params.itemId).select(
    ' title price glassWidth sideSize lenseSize description images'
  );
  const v = req.body.lensesOpt;
  const thickPrice = lens[0].thickness.filter((tk) =>
    tk.subtitle.startsWith(v.thicknessType.type)
  )[0].price;
  const adLensPrice = lens[0].advancedLensType.filter((ad) =>
    ad.subtitle.startsWith(v.advancedLensesType.type)
  )[0].price;

  totalP = product.price + thickPrice + adLensPrice;
  let item = {
    item: product,
    lenses: v,
    price: totalP,
    id: product.id,
    type: 'glassesWithlense',
  };
  cart.add(item, item.id);
  req.session.cart = cart;
  res.status(200).json({ status: 'success' });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  const item = await Product.findById(req.params.id);
  if (!item) return next(new AppError('somthing wrong please try again!'));
  cart.add(item, item.id);
  req.session.cart = cart;
  res.status(200).json({ status: 'success' });
});
