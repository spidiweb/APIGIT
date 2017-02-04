// grab the things we need
var mongoose = require('mongoose');
var Address = require('./Address');
var Item = require('./Item');

var Schema = mongoose.Schema;

// create a schema
var orderSchema = new Schema({
    Items: Array,//Item[]
    ScheduledPickupTime: Date,
    ActualPickupTime: Date,
    ScheduledDeliveryTime: Date,
    ActualDeliveryTime: Date,
    InvoiceDetails: Object,
    Address: Object
});

orderSchema.pre('save', function (next) {

    var date = new Date();
    if (!this.CreateDate) {
        this.CreateDate = date;
        this.method.generatePasswordSalt();
    }

    this.UpdateDate = date;
    next();
});


// the schema is useless so far
// we need to create a model using it
var customer = mongoose.model('Order', orderSchema);

// make this available to our users in our Node applications
module.exports = customer;