const express = require('express');
var cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var fs = require('fs')
var https = require('https')
const stripe = require('stripe')('sk_test_51H4SxWLVOH5lsckxVgT49pMO5oVK88TqSBFQGvffoJZYFyYezMLMTwWiKw4l00tAmbotK6DOtTTGUbukpUJi3A9U00esYnIMWk');

app.get('/', async (req, res) => {
 res.send('homepage!')
 return "hello"
});

app.post('/', function (req, res) {
    console.log(req.body.intent)
});

app.post('/intent', async (req, res) => {
    if(!req.body.intent) return res.send('No intent object passed...')
    const paymentIntent = await stripe.paymentIntents.create(req.body.intent);
    res.json({intent: paymentIntent});

});

// app.listen(80, () => {
//   console.log('Running on localhost');
// });

https.createServer({
  key: fs.readFileSync('~/server.key'),
  cert: fs.readFileSync('~/server.cert')
}, app)
.listen(80, function () {
  console.log('Go to https://localhost:3000/')
})
