/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51Jj1vbFMbzlOrgpzLWrAKVNaR2A5ZGuBEpaHTzjzLyiUR9FRWM22KW9HpSCruNCib3P7qgWbPIpF3tGPJutBSGp200wAxkQKoy'
);

export const orderGlasses = async () => {
  try {
    spinnerLoader();
    const hadi = setTimeout(() => {
      console.log('hamza');
    }, 4000);

    const session = await axios('api/orders/checkout-session');

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert(
      'error',
      'your not logged in please signin Or rejister an account'
    );
    setTimeout(() => {
      location.assign('/login');
    }, 1000);
  }
};
