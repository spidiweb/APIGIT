// grab the things we need
var mongoose = require('mongoose');
//var Address = require('./Address');
var Order = require('./Order');
var Schema = mongoose.Schema;

// create a schema
var customerSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: { type: String, required: true, unique: true },
    PasswordSalt: String,
    Password: { type: String, required: true },
    CreateDate: Date,
    UpdateDate: Date,
    Active: Boolean,
    Orders: Array,
    Addresses: Array//Array of Addresses
});

customerSchema.pre('save', function (next) {
    var self = this;
    var model = mongoose.model('customers', customerSchema);

    model.findOne({Email:self.Email},function(err,result){
        if(err)
        {
            console.log(err);
            //done();
        }
        else if(result) { //there was a result found, so the email address exists
            console.log(result);
            self.invalidate("email","email must be unique");
            //done(new Error("email must be unique"));
        } 
        else {
            //done();
        }
    })
    var date = new Date();
    if (!this.CreateDate) {
        this.CreateDate = date;

        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        this.PasswordSalt = text;
    }

    this.UpdateDate = date;
    next();
})
customerSchema.generatePasswordSalt = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    this.PasswordSalt = text;
}

customerSchema.method.hashPassword = function () {
    //Logic neds to be written. Follow this: http://www.myersdaily.org/joseph/javascript/md5-text.html
}


// the schema is useless so far
// we need to create a model using it
var customer = mongoose.model('Customer', customerSchema);

// make this available to our users in our Node applications
module.exports = customer;