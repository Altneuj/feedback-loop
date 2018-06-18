const keys= require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
module.exports = app => {
    app.post('/api/stripe', requireLogin, async (request, response) => {
        const charge = await stripe.charges.create({
            amount: 500, 
            currency: 'usd',
            description: '$5 for 5 credits',
            source: request.body.id
        });
        request.user.credits += 5;
        const user = await request.user.save();
        response.send(user)
  
    });
  };
