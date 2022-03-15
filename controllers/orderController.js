const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Cart = require('../models/cartModel');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const cart = new Cart(req.session.cart);
  let arrCart = cart.list().map((i) => {
    if (i.item.type === 'glassesWithlense') {
      return {
        name: `${i.item.item.title} + 2xEyeglasses for ${
          i.item.lenses.lensesType.type
        } ${i.item.lenses.thicknessType.type || 'no'} thikness , and ${
          i.item.lenses.advancedLensesType.type || '...'
        }`,
        description: i.item.params,
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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'bancontact', 'sofort', 'ideal'],
    success_url: `${req.protocol}://${req.get('host')}/success`,
    cancel_url: `${req.protocol}://${req.get('host')}/prescription`,
    customer_email: req.user.email,
    shipping_address_collection: {
      allowed_countries: [
        'AC',
        'AD',
        'AE',
        'AF',
        'AG',
        'AI',
        'AL',
        'AM',
        'AO',
        'AQ',
        'AR',
        'AT',
        'AU',
        'AW',
        'AX',
        'AZ',
        'BA',
        'BB',
        'BD',
        'BE',
        'BF',
        'BG',
        'BH',
        'BI',
        'BJ',
        'BL',
        'BM',
        'BN',
        'BO',
        'BQ',
        'BR',
        'BS',
        'BT',
        'BV',
        'BW',
        'BY',
        'BZ',
        'CA',
        'CD',
        'CF',
        'CG',
        'CH',
        'CI',
        'CK',
        'CL',
        'CM',
        'CN',
        'CO',
        'CR',
        'CV',
        'CW',
        'CY',
        'CZ',
        'DE',
        'DJ',
        'DK',
        'DM',
        'DO',
        'DZ',
        'EC',
        'EE',
        'EG',
        'EH',
        'ER',
        'ES',
        'ET',
        'FI',
        'FJ',
        'FK',
        'FO',
        'FR',
        'GA',
        'GB',
        'GD',
        'GE',
        'GF',
        'GG',
        'GH',
        'GI',
        'GL',
        'GM',
        'GN',
        'GP',
        'GQ',
        'GR',
        'GS',
        'GT',
        'GU',
        'GW',
        'GY',
        'HK',
        'HN',
        'HR',
        'HT',
        'HU',
        'ID',
        'IE',
        'IL',
        'IM',
        'IN',
        'IO',
        'IQ',
        'IS',
        'IT',
        'JE',
        'JM',
        'JO',
        'JP',
        'KE',
        'KG',
        'KH',
        'KI',
        'KM',
        'KN',
        'KR',
        'KW',
        'KY',
        'KZ',
        'LA',
        'LB',
        'LC',
        'LI',
        'LK',
        'LR',
        'LS',
        'LT',
        'LU',
        'LV',
        'LY',
        'MA',
        'MC',
        'MD',
        'ME',
        'MF',
        'MG',
        'MK',
        'ML',
        'MM',
        'MN',
        'MO',
        'MQ',
        'MR',
        'MS',
        'MT',
        'MU',
        'MV',
        'MW',
        'MX',
        'MY',
        'MZ',
        'NA',
        'NC',
        'NE',
        'NG',
        'NI',
        'NL',
        'NO',
        'NP',
        'NR',
        'NU',
        'NZ',
        'OM',
        'PA',
        'PE',
        'PF',
        'PG',
        'PH',
        'PK',
        'PL',
        'PM',
        'PN',
        'PR',
        'PS',
        'PT',
        'PY',
        'QA',
        'RE',
        'RO',
        'RS',
        'RU',
        'RW',
        'SA',
        'SB',
        'SC',
        'SE',
        'SG',
        'SH',
        'SI',
        'SJ',
        'SK',
        'SL',
        'SM',
        'SN',
        'SO',
        'SR',
        'SS',
        'ST',
        'SV',
        'SX',
        'SZ',
        'TA',
        'TC',
        'TD',
        'TF',
        'TG',
        'TH',
        'TJ',
        'TK',
        'TL',
        'TM',
        'TN',
        'TO',
        'TR',
        'TT',
        'TV',
        'TW',
        'TZ',
        'UA',
        'UG',
        'US',
        'UY',
        'UZ',
        'VA',
        'VC',
        'VE',
        'VG',
        'VN',
        'VU',
        'WF',
        'WS',
        'XK',
        'YE',
        'YT',
        'ZA',
        'ZM',
        'ZW',
        'ZZ',
      ],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'eur',
          },
          display_name: 'Free shipping',
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'eur',
          },
          display_name: 'Next day air',
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    line_items: arrCart,
    allow_promotion_codes: true,
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

// exports.createOrderCheckout = catchAsync(async (req, res, next) => {
//   const { user, amount } = req.query;
//   const cart = new Cart(req.session.cart);
//   const products = cart.list();

//   if (!products && !user && !amount) return next();

//   await Order.create({ products, user, amount });
//   req.session.cart = {};
//   res.redirect('/success', {
//     title: ' all is done 😆',
//   });
// });

const createOrderCheckout = async (obj) => {
  const user = (await User.findOne({ email: obj.customer_email })).id;
  const product = obj.display_items.id;
  const amount = obj.display_items.amount / 100;
  await Order.create({ product, user, amount });
  req.session.cart = {};
};

exports.webhookCheckout = (req, res, next) => {
  const signature = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_KEY
    );
  } catch (err) {
    res.status(400).send(`there is an error ${err}`);
  }
  if (event.type === 'checkout.session.completed') {
    createOrderCheckout(event.data.object);
  }
  res.status(200).json({ received: true });
};

exports.createOrder = factory.createOne(Order);
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
