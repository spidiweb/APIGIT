var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log(req);
  var x = req.query;
  console.log(x);
  var user = new Object();
  res.send();
});

// router.post('/anant', function(req, res, next) {
//    console.log(req.body);
//   res.send('something');
// });

module.exports = router;