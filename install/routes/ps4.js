var express = require('express');
const nodeFetch = require('node-fetch')
var router = express.Router();

var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'SIGDOHXKEGJ63EXA';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
A route on a POST method that retrieves data from an external API. For
example, you might hit the Weather Channel API to retrieve the current
weather conditions. ProgrammableWeb.com is a good spot to find APIs
offering data you are interested in. The route must use Promises to
manage the async http call. Use the 'request' package as your HTTP client
(with the understanding that it is deprecated). Wrap the request in a
Promise.
*/
router.post('/', idTokenCheck, async (req, res) => {
  const post = req.body;
  post.date = new Date().getTime();
  post.status = 'waiting-for-approval';
  const { id } = req.user;
  post.userId = id;
  const result = await db.collection(POST_COLLECTION).insertOne(post);
  res.json(result);
});

//do not push:"SIGDOHXKEGJ63EXA"


module.exports = router;
