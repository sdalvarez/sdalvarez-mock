var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let localAddress = req.connection.localAddress;
  let addr = localAddress.split("::ffff:");
  console.log(addr);
  addr = addr[1];
  if(addr == null || addr == 'undefined')
    addr = 'localhost'
  res.render('admin', {
    title: 'SDALVAREZ MOCK',
    addr: addr
  });
});

module.exports = router;