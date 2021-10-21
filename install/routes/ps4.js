var express = require('express');
const nodeFetch = require('node-fetch');
var request = require('request');
const {response} = require('express');
let config = require('../config.json');
var router = express.Router();

router.get('/', async(req, res, next)=>{
  const result = await nodeFetch(config.fundamentals)
      .then(res =>
          res.json()
      )
      .then(text => {
        console.log(text)
        res.render('form', { title: JSON.stringify(text.Name), desc: JSON.stringify(text.Description),
            sName: JSON.stringify(req.body.name)})
      })
      .catch(err => console.log(err));
});

/*
1b:
A route on a POST method that retrieves data from an external API. For
example, you might hit the Weather Channel API to retrieve the current
weather conditions. ProgrammableWeb.com is a good spot to find APIs
offering data you are interested in. The route must use Promises to
manage the async http call. Use the 'request' package as your HTTP client
(with the understanding that it is deprecated). Wrap the request in a
Promise.
*/
router.post('/b', function(req,res,next) {
  return new Promise((resolve,reject)=>{
    request({
      url: config.fundamentals,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, result, data) => {
      if (err) {
        reject(result)
        console.log('Error:', err);
      } else if (result.statusCode !== 200) {
        resolve(data);
        console.log('Status:', result.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        resolve(data)
        console.log(data);
      }
});
  }).then((result)=>{
        //resolve
        res.render('index',{title:JSON.stringify(result.Name), desc: JSON.stringify(result.Description)});
      },
      //reject
      (result) => {
        res.render('index',{title:result.statusCode});
      });
});

/*
1c:
A second route, similar to the one in b. that uses async/await syntax
rather than Promises. You can hit the same API endpoint as b. Use 'nodefetch' for this one.
 */
router.post('/c', async (req, res) => {
  const result = await nodeFetch(config.fundamentals)
    .then(res =>
      res.json()
    )
      .then(text => {
        console.log(text)
        res.render('index', { title: JSON.stringify(text.Name), desc: JSON.stringify(text.Description)})
      })
    .catch(err => console.log(err));
});
/*
const result = await nodeFetch(config.fundamentals)
    .then(res => {
      res.text()
    })
    .then(text => {
          console.log(text)
    })
    .catch(err => console.log(err));
 */

/*
1d:
A third route, similar to b. and c., that uses a callback to handle the async
API call. For this one, use the 'request' package. It's fine to hit the same
endpoint.
*/
router.post('/d', function (req, res){
  request({
    url: config.fundamentals,
    json: true,
  }, (err, result, data)=> {
    if (err) {
      console.log('Error:', err);
    } else if (result.statusCode !== 200) {
      console.log('Status:', result.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      res.render('index',{title:JSON.stringify(data.Name), desc: JSON.stringify(data.Description)});
      console.log(data);
    }
  })
});


module.exports = router;
