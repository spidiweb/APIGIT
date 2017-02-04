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

router.post("/create", function (req, res, next) {

    console.log(req.body);
    // var inputParam = JSON.parse(req.body);
    //(req.body.user)
    // console.log(inputParam);
    console.log(typeof req.body.user);
    var newUser = new User(req.body.user);
    console.log('newUser', newUser, 'req.body', req.body);
    //newUser.method.generatePasswordSalt();//How to call this function present in model class.

    // newUser.generatePasswordSalt();
    newUser.save().then(
        function (resp) {
            if (err) {
                console.log(resp);
            }
            console.log(newUser, "UserSaved Successfully");
            res.send(newUser);
        },
        function (err) {
            console.log(err);
            res.send(err);
        });
})
router.post("/Authanticate", function (req, res, next) {
    console.log(req.body);
    var user = req.body.user;
    User.find({ Email: user.Email }).then(
        function (resp) {
            if (resp.length > 0) {
                if (resp[0].Password === user.Password) {
                    user = resp[0];
                    user.Password = "";
                    user.PasswordSalt = "";
                    res.send(user);
                }
                else {
                    var error = {};
                    error.ErrorMessage = "Wrong Password";
                    res.send(error);
                }
            }
            else {
                var error = {};
                error.ErrorMessage = "You are not registered with us, Enter some basic details for quick signup.";
                res.send(error);
            }
            // console.log(resp);
            // res.send(resp);
        }
        , function (err) {
            res.send(err);
            console.log(err);
        })
});

router.get("/", function (req, res, next) {

})

module.exports = router;