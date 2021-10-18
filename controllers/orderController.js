const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Cart = require('../models/cartModel');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  console.log(req.session.cart);
  const cart = new Cart(req.session.cart);
  let arrCart = cart.list().map((i) => {
    if (i.item.type === 'glassesWithlense') {
      return {
        name: `${i.item.item.title} + 2xEyeglasses for ${
          i.item.lenses.lensesType.type
        } ${i.item.lenses.thicknessType.type || 'no'} thikness , and ${
          i.item.lenses.advancedLensesType.type || '...'
        }`,
        description: i.item.item.description,
        images: [
          `${req.protocol}://${req.get('host')}/img/products/${
            i.item.item.images[0]
          }`,
          `${req.protocol}://${req.get('host')}/images/lenses.png`,
        ],
        amount: i.item.price * 100,
        currency: 'eur',
        quantity: i.quantity,
      };
    }
    return {
      name: `${i.item.title}`,
      description: i.item.description,
      images: [
        `${req.protocol}://${req.get('host')}/img/products/${i.item.images[0]}`,
      ],
      amount: i.item.price * 100,
      currency: 'eur',
      quantity: i.quantity,
    };
  });

  // console.log(req.user, cart.totalPrice, cart.totalQuantity, arrCart);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'bancontact', 'sofort'],
    success_url: `${req.protocol}://${req.get('host')}/my-order?user=${
      req.user.id
    }&amount=${cart.totalPrice}`,
    cancel_url: `${req.protocol}://${req.get('host')}/products`,
    customer_email: req.user.email,
    line_items: arrCart,
    allow_promotion_codes: true,
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createOrderCheckout = catchAsync(async (req, res, next) => {
  const { user, amount } = req.query;
  const cart = new Cart(req.session.cart);
  const products = cart.list();

  if (!products && !user && !amount) return next();

  await Order.create({ products, user, amount });
  req.session.cart = {};
  next();
});

exports.createOrder = factory.createOne(Order);
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
