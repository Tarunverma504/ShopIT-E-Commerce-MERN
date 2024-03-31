const catchAsyncError = require('../middlewares/catchAsyncErrors');
const dotenv = require('dotenv');
//dotenv.config({path:'./config/config.env'})
dotenv.config({ path: require('find-config')('.env') })
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


//Process stripe payments => /api/v1/payment/process
exports.processPayment = catchAsyncError(async(req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'INR',
        metadata: { integration_check: 'accept_a_payment'}
    });
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})


//Send stripe api key => /api/v1/stripeapi
exports.sendStripApi = catchAsyncError(async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})

