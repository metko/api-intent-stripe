require('dotenv').config()

const express = require('express');
var router = express.Router();
var cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
var fs = require('fs')
const http = require('http');
var https = require('https')
const stripe = require('stripe')('sk_test_51H4SxWLVOH5lsckxVgT49pMO5oVK88TqSBFQGvffoJZYFyYezMLMTwWiKw4l00tAmbotK6DOtTTGUbukpUJi3A9U00esYnIMWk');

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/'+process.env.URL_API+'/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/'+process.env.URL_API+'/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/'+process.env.URL_API+'/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// router.get('/', async (req, res) => {
//  res.send('homepage!')
// });

router.options('/intent', cors())
router.post('/intent', async (req, res) => {
    //res.header('Access-Control-Allow-Origin', '*');
    if(!req.body.intent) return res.send('No intent object passed...')
    const paymentIntent = await stripe.paymentIntents.create(req.body.intent);
    res.json({intent: paymentIntent});
});

app.use(process.env.PREFIX_API_URL, router)


http.createServer(app).listen(8080);

https.createServer(credentials, app).listen(443, () => {
  console.log('Server running at '+process.env.URL+process.env.PREFIX_API_URL)
})
