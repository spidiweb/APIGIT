var express = require('express');
var router = express.Router();
var User = require('../models/customer');
var Order = require('../models/Order');
router.get("/", function (req, res, next) {
    var params = req.query;
    console.log(params.userID);
    if (params.userID != undefined) {
        User.findById(params.userID).then(
            function (resp) {
                if (resp.length > 0) {
                    var user = resp[0];
                    res.send(user.Orders);
                }
                else {
                    var error = {};
                    error.ErrorMessage = "Invalid UserID Passed.";
                    res.send(error);
                }
            },
            function (err) {
                res.send(err);
            });
    }
    else if (params.emailID != undefined) {
        User.find({ Email: params.emailID }).then(
            function (resp) {
                if (resp.length > 0) {
                    var user = resp[0];
                    res.send(user.Orders);
                }
                else {
                    var error = {};
                    error.ErrorMessage = "Invalid EmailID Passed.";
                    res.send(error);
                }
            },
            function (err) {
                res.send(err);
            });
    }
    else {
        var error = {};
        error.ErrorMessage = "Please pass UserID or EmailID to fetch orders.";
    }
});


module.exports = router;