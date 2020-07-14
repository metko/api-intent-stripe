const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const stripe = require('stripe')('sk_test_51H4SxWLVOH5lsckxVgT49pMO5oVK88TqSBFQGvffoJZYFyYezMLMTwWiKw4l00tAmbotK6DOtTTGUbukpUJi3A9U00esYnIMWk');

app.get('/', async (req, res) => {
 res.send('homepage!')
 return "hello"
});

app.post('/', function (req, res) {
    console.log(req.body.intent)
});

app.post('/intent', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create(req.body.intent);
    res.json({client_secret: paymentIntent.client_secret});

});

app.listen(80, () => {
  console.log('Running on localhost');
});