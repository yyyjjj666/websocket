var express = require('express');
var router = express.Router();
let sendMessage = require('../lib/socket').sendMessage;
/* GET home page. */
router.get('/', function (req, res, next) {
    sendMessage(req.query.id, req.query.str);
    res.render('index', {title: 'Express'});
});
module.exports = router;
